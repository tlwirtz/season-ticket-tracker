'use server';
import { db } from '../../db/db';
import { eq } from 'drizzle-orm';
import { matchTable, redemptionCodeTable, ticketRedemptionTable } from '../../db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Update and claim a ticket.
 *
 * @param param0
 * @returns
 */
export async function validateRedemptionCode({
    matchId,
    claimedUser,
    available,
    redemptionCode
}: {
    matchId: number;
    claimedUser: { uid: number };
    available: boolean;
    redemptionCode: string;
}) {
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
                available,
                claimedUserId: claimedUser.uid.toString(),
                qtyTicketsAvailable: newTicketQty
            })
            .where(eq(matchTable.id, matchId));

        await tx.insert(ticketRedemptionTable).values({
            matchId,
            claimedUserId: claimedUser.uid.toString(),
            claimQty,
            redemptionCodeId: dbRedemptionCode.id
        });
    });

    revalidatePath(`/matches/${matchId}`);
    redirect(`/matches/${matchId}`);

    return { success: true, message: 'Ticket claimed.' };
}
