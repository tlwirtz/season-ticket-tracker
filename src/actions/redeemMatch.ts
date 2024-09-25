'use server';
import { db } from '../../db/db';
import { eq } from 'drizzle-orm';
import { matchTable, redemptionCodeTable, ticketRedemptionTable } from '../../db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

/**
 * Update and claim a ticket.
 *
 * @param param0
 * @returns
 */
export async function validateAndClaimTicket({
    matchId,
    redemptionCode
}: {
    matchId: number;
    redemptionCode: string;
}) {
    const { userId } = auth();

    console.log('userId', userId);

    if (!userId) {
        return { success: false, message: 'User not found.' };
    }

    const [dbRedemptionCode] = await db
        .select()
        .from(redemptionCodeTable)
        .where(eq(redemptionCodeTable.code, redemptionCode));

    const [match] = await db.select().from(matchTable).where(eq(matchTable.id, matchId));

    console.log('redemptionCodes', redemptionCode);

    //this should never really happen
    if (!match) {
        console.error(`${matchId} not found.`);
        return { success: false, message: 'Match not found.' };
    }

    if (!dbRedemptionCode) {
        console.error(`${dbRedemptionCode} not found.`);
        return { success: false, message: 'Redemption code not found.' };
    }

    const claimQty = 1;
    let newTicketQty = match.qtyTicketsAvailable;

    if (match.qtyTicketsAvailable > 0) {
        newTicketQty = match.qtyTicketsAvailable - claimQty;
    } else {
        console.error(`${matchId} does not have any tickets available.`);
        return { success: false, message: 'No tickets available.' };
    }

    await db.transaction(async tx => {
        await tx
            .update(matchTable)
            .set({
                available: newTicketQty > 0,
                claimedUserId: userId,
                qtyTicketsAvailable: newTicketQty
            })
            .where(eq(matchTable.id, matchId));

        await tx.insert(ticketRedemptionTable).values({
            matchId,
            claimedUserId: userId,
            claimQty,
            redemptionCodeId: dbRedemptionCode.id
        });
    });

    revalidatePath(`/matches/${matchId}`);
    redirect(`/matches/${matchId}`);

    //this doesn't get sent back to the client
    return { success: true, message: 'Ticket claimed.' };
}
