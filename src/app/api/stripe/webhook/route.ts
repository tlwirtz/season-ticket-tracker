import Stripe from 'stripe';
import { db } from '../../../../../db/db';
import { matchTable, redemptionCodeTable, ticketRedemptionTable } from '../../../../../db/schema';
import { eq } from 'drizzle-orm';
import { clerkClient, User } from '@clerk/nextjs/server';

interface ClaimTicketParams {
    matchId: number;
    customerEmail: string;
}

const STRIPE_REDEMPTION_CODE = 'stripe_redemption';

async function claimTicket({ matchId, customerEmail }: ClaimTicketParams) {
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
            redemptionCodeId: dbRedemptionCode.id
        });
    });
}

export async function POST(request: Request) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

    if (!secretKey) {
        console.error(`No publishable key, could not init Stripe library`);
        return new Response('Failure', { status: 500 });
    }

    if (!endpointSecret) {
        console.error(`No endpoint secrete, could not validate webhook payload`);
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
            const data = event.data.object;
            console.log(`Client Reference ${data.client_reference_id}`);
            console.log(`Client Email: ${data.customer_email}`);
            try {
                //todo -- check if we've handled this event before
                claimTicket({
                    matchId: Number(data.client_reference_id),
                    customerEmail: data.customer_email ?? ''
                });
                //todo -- write event to table so we don't process duplicates
            } catch (err) {
                const knownErr = err as Error;
                return new Response(`Failure: ${knownErr.message}`, { status: 400 });
            }

            break;
        default:
            console.log(`Unhandled event type: ${event.type}`);
            break;
    }

    return new Response('Success!', { status: 200 });
}
