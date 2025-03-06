import { db } from '../../../../../db/db';
import {
    matchTable,
    redemptionCodeTable,
    stripeWebhookEventsTable,
    ticketRedemptionTable
} from '../../../../../db/schema';
import { eq, and, or } from 'drizzle-orm';
import { clerkClient } from '@clerk/nextjs/server';
import Stripe from 'stripe'; //for types

interface ClaimTicketParams {
    matchId: number;
    customerEmail: string;
    stripeEventRecordId: number;
}

const STRIPE_REDEMPTION_CODE = 'stripe_redemption';

async function haveProcessedStripeEvent(stripeEvent: Stripe.CheckoutSessionCompletedEvent) {
    let haveSeen = false;

    //check if we've seen this event before and processed it ok.
    //stripe recommends we check both by event id and object id + event type
    //https://docs.stripe.com/webhooks#handle-duplicate-events
    const [maybeRecord] = await db
        .select()
        .from(stripeWebhookEventsTable)
        .where(
            or(
                and(
                    eq(stripeWebhookEventsTable.eventId, stripeEvent.id),
                    eq(stripeWebhookEventsTable.processedOk, true)
                ),
                and(
                    eq(stripeWebhookEventsTable.objectId, stripeEvent.data.object.id),
                    eq(stripeWebhookEventsTable.eventType, stripeEvent.type),
                    eq(stripeWebhookEventsTable.processedOk, true)
                )
            )
        );

    if (maybeRecord) {
        haveSeen = true;
    }

    return haveSeen;
}

//todo -- json docs
//record seen webhook id
async function recordStripeEvent(stripeEvent: Stripe.CheckoutSessionCompletedEvent) {
    const [newRecord] = await db
        .insert(stripeWebhookEventsTable)
        .values({
            eventBody: JSON.stringify(stripeEvent),
            objectId: stripeEvent.data.object.id,
            eventId: stripeEvent.id,
            eventType: stripeEvent.type
        })
        .returning({ insertedId: stripeWebhookEventsTable.id });

    return newRecord;
}

//todo -- abstract this into another file
//todo -- a lot of this claim logic is duplicated from the action that processes the basic form
async function claimTicket({ matchId, customerEmail, stripeEventRecordId }: ClaimTicketParams) {
    //need to lookup the user by their email. Maybe we should actually pass the user id
    //can we pass a JSON string as the customer reference?
    const client = clerkClient();
    const maybeUsers = await client.users.getUserList({ emailAddress: [customerEmail] });
    const [match] = await db.select().from(matchTable).where(eq(matchTable.id, matchId));

    if (maybeUsers.totalCount <= 0) {
        console.error(`no users found with email: ${customerEmail}`);
        throw new Error(`Could not find user with email: ${customerEmail}`);
    }

    if (maybeUsers.totalCount > 1) {
        //this shouldn't really happen, but it's still a possibility.
        console.warn(`more than one user found with email ${customerEmail}. Selecting first one.`);
    }

    if (!match) {
        console.error(`${matchId} not found.`);
        throw new Error(`Match not found: ${matchId}`);
    }

    const claimQty = 1;
    let newTicketQty = match.qtyTicketsAvailable;

    if (match.qtyTicketsAvailable > 0) {
        newTicketQty = match.qtyTicketsAvailable - claimQty;
    } else {
        console.error(`${matchId} does not have any tickets available.`);
        throw new Error(`No tickets available for match ${matchId}`);
    }

    const [dbRedemptionCode] = await db
        .select()
        .from(redemptionCodeTable)
        .where(eq(redemptionCodeTable.code, STRIPE_REDEMPTION_CODE));

    await db.transaction(async tx => {
        await tx
            .update(matchTable)
            .set({
                available: newTicketQty > 0,
                //todo -- this column should get dropped.
                //todo -- multiple users could claim tickets for a match.
                claimedUserId: maybeUsers.data[0].id,
                qtyTicketsAvailable: newTicketQty
            })
            .where(eq(matchTable.id, matchId));

        await tx.insert(ticketRedemptionTable).values({
            matchId,
            claimedUserId: maybeUsers.data[0].id,
            claimQty,
            redemptionCodeId: dbRedemptionCode.id,
            stripeEventId: stripeEventRecordId
        });

        await tx
            .update(stripeWebhookEventsTable)
            .set({ processedOk: true, updatedAt: new Date() })
            .where(eq(stripeWebhookEventsTable.id, stripeEventRecordId));
    });
}

async function handleStripeEvent(event: Stripe.CheckoutSessionCompletedEvent) {
    //todo -- should we combine the call to "recordStripeEvent" with the larger transaction? Probably
    const data = event.data.object;

    const haveSeen = await haveProcessedStripeEvent(event);
    if (haveSeen) {
        console.log(`Already processed event: ${event.id}`);
        return new Response('Success!', { status: 200 });
    }

    const recordId = await recordStripeEvent(event);

    await claimTicket({
        matchId: Number(data.client_reference_id),
        customerEmail: data.customer_email ?? '',
        stripeEventRecordId: recordId.insertedId
    });

    return new Response('Success!', { status: 200 });
}

export async function POST(request: Request) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

    if (!secretKey) {
        console.error(`No publishable key, could not init Stripe library`);
        return new Response('Failure', { status: 500 });
    }

    if (!endpointSecret) {
        console.error(`No endpoint secret, could not validate webhook payload`);
        return new Response('Failure', { status: 500 });
    }

    const stripe = new Stripe(secretKey);

    const sig = request.headers.get('Stripe-Signature') ?? '';
    const body = await request.text();

    let event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: unknown) {
        const knownErr = err as Error;
        console.error(`Error validating webhook: ${knownErr.message}`);
        return new Response(`${knownErr.message}`, { status: 400 });
    }

    switch (event.type) {
        case 'checkout.session.completed':
            console.log(`Found checkout session event: ${event.id}`);
            try {
                const res = await handleStripeEvent(event);
                return res;
            } catch (err) {
                const knownErr = err as Error;
                return new Response(`Failure: ${knownErr.message}`, { status: 400 });
            }
        default:
            console.log(`Unhandled event type: ${event.type}`);
            break;
    }

    return new Response('Success!', { status: 200 });
}
