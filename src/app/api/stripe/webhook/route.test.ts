import { describe, it, expect, vi, afterEach, beforeEach, MockedObject } from 'vitest';
import Stripe from 'stripe';
import { POST } from './route';
import { db } from '../../../../../db/db';
import { clerkClient, User } from '@clerk/nextjs/server';
import {
    matchTable,
    stripeWebhookEventsTable,
    teamTable,
    ticketRedemptionTable
} from '../../../../../db/schema';
import { eq } from 'drizzle-orm';
import { generateFakeTeams, generateFakeMatches } from '../../../../../db/fake-data-generators';

vi.importMock('@clerk/nextjs/server');

//Mock the stripe class
vi.mock('stripe', () => {
    const Stripe = vi.fn();
    Stripe.prototype.webhooks = {
        constructEvent: vi.fn()
    };

    return { default: Stripe };
});

describe('POST', () => {
    let stripe: MockedObject<Stripe>;

    const mockRequest = (body: any, headers: any = {}) => ({
        text: () => Promise.resolve(JSON.stringify(body)),
        headers: {
            get: (name: string) => headers[name]
        }
    });

    beforeEach(() => {
        stripe = vi.mocked(new Stripe('test-api-key'));
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return 500 if STRIPE_SECRET_KEY is not set', async () => {
        process.env.STRIPE_SECRET_KEY = '';
        process.env.STRIPE_ENDPOINT_SECRET = 'test_endpoint_secret';

        const response = await POST(mockRequest({}) as Request);
        expect(response.status).toBe(500);
    });

    it('should return 500 if STRIPE_ENDPOINT_SECRET is not set', async () => {
        process.env.STRIPE_SECRET_KEY = 'test_secret_key';
        process.env.STRIPE_ENDPOINT_SECRET = '';

        const response = await POST(mockRequest({}) as Request);
        expect(response.status).toBe(500);
    });

    it('should return 400 if webhook validation fails', async () => {
        process.env.STRIPE_SECRET_KEY = 'test_secret_key';
        process.env.STRIPE_ENDPOINT_SECRET = 'test_endpoint_secret';

        vi.mocked(stripe.webhooks.constructEvent).mockImplementation(() => {
            console.log('inside error spy');
            throw new Error('Invalid signature');
        });

        const response = await POST(
            mockRequest({}, { 'Stripe-Signature': 'invalid_signature' }) as Request
        );
        expect(response.status).toBe(400);
    });

    it('should handle checkout.session.completed event', async () => {
        process.env.STRIPE_SECRET_KEY = 'test_secret_key';
        process.env.STRIPE_ENDPOINT_SECRET = 'test_endpoint_secret';

        const [savedTeam1, savedTeam2] = await db
            .insert(teamTable)
            .values(generateFakeTeams(2))
            .returning();

        const [match] = generateFakeMatches(1, [savedTeam1, savedTeam2]);
        const [savedMatch] = await db.insert(matchTable).values(match).returning();

        const mockEvent = {
            id: 'evt_test',
            type: 'checkout.session.completed',
            data: {
                object: {
                    id: 'obj_test',
                    client_reference_id: savedMatch.id.toString(),
                    customer_email: 'test@example.com'
                }
            }
        };

        vi.mocked(stripe.webhooks.constructEvent).mockImplementation(() => {
            return mockEvent as Stripe.Event;
        });

        vi.spyOn(clerkClient.users, 'getUserList').mockResolvedValueOnce({
            totalCount: 1,
            data: [{ id: 'user_test' }] as User[]
        });

        const response = await POST(
            mockRequest(mockEvent, { 'Stripe-Signature': 'valid_signature' }) as Request
        );

        const [updatedMatch] = await db
            .select()
            .from(matchTable)
            .where(eq(matchTable.id, savedMatch.id));

        const [ticketRedemption] = await db
            .select()
            .from(ticketRedemptionTable)
            .where(eq(ticketRedemptionTable.matchId, savedMatch.id));

        const [stripeEvent] = await db
            .select()
            .from(stripeWebhookEventsTable)
            .where(eq(stripeWebhookEventsTable.eventId, mockEvent.id));

        expect(response.status).toBe(200);
        expect(ticketRedemption).toBeTruthy();
        expect(ticketRedemption.claimedUserId).toBe('user_test');
        expect(ticketRedemption.stripeEventId).not.toBe(null);
        expect(updatedMatch.qtyTicketsAvailable).toBe(savedMatch.qtyTicketsAvailable - 1);
        expect(stripeEvent).toBeTruthy();
        expect(stripeEvent.processedOk).toBe(true);
        expect(stripeEvent.id).toBe(ticketRedemption.stripeEventId);
    });

    it('should return 200 for unhandled event types', async () => {
        process.env.STRIPE_SECRET_KEY = 'test_secret_key';
        process.env.STRIPE_ENDPOINT_SECRET = 'test_endpoint_secret';

        const mockEvent = {
            id: 'evt_test_unhandled',
            type: 'unhandled.event',
            data: {
                object: {}
            }
        };

        vi.mocked(stripe.webhooks.constructEvent).mockImplementation(() => {
            return mockEvent as Stripe.Event;
        });
        const response = await POST(
            mockRequest(mockEvent, { 'Stripe-Signature': 'valid_signature' }) as Request
        );

        const [maybeStripeEvent] = await db
            .select()
            .from(stripeWebhookEventsTable)
            .where(eq(stripeWebhookEventsTable.eventId, mockEvent.id));

        expect(response.status).toBe(200);
        expect(maybeStripeEvent).toBeFalsy();
    });

    it('should not process the same stripe event twice', async () => {
        process.env.STRIPE_SECRET_KEY = 'test_secret_key';
        process.env.STRIPE_ENDPOINT_SECRET = 'test_endpoint_secret';

        const [savedTeam1, savedTeam2] = await db
            .insert(teamTable)
            .values(generateFakeTeams(2))
            .returning();

        const [match] = generateFakeMatches(1, [savedTeam1, savedTeam2], 1, 1);
        const [savedMatch] = await db.insert(matchTable).values(match).returning();

        const mockEvent = {
            id: 'evt_test_duplicate',
            type: 'checkout.session.completed',
            data: {
                object: {
                    id: 'obj_test_duplicate',
                    client_reference_id: savedMatch.id.toString(),
                    customer_email: 'test@example.com'
                }
            }
        };

        vi.mocked(stripe.webhooks.constructEvent).mockImplementation(() => {
            return mockEvent as Stripe.Event;
        });

        vi.spyOn(clerkClient.users, 'getUserList').mockResolvedValue({
            totalCount: 1,
            data: [{ id: 'user_test' }] as User[]
        });

        // First call to process the event
        await POST(mockRequest(mockEvent, { 'Stripe-Signature': 'valid_signature' }) as Request);

        // Second call to process the same event
        const response = await POST(
            mockRequest(mockEvent, { 'Stripe-Signature': 'valid_signature' }) as Request
        );

        const stripeEvents = await db
            .select()
            .from(stripeWebhookEventsTable)
            .where(eq(stripeWebhookEventsTable.eventId, mockEvent.id));

        const ticketRedemptions = await db
            .select()
            .from(ticketRedemptionTable)
            .where(eq(ticketRedemptionTable.matchId, savedMatch.id));

        expect(response.status).toBe(200);
        expect(stripeEvents).toHaveLength(1);
        expect(ticketRedemptions).toHaveLength(1);
    });
});
