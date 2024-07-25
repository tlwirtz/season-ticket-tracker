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
    const redemptionCodes = await db.select().from(redemptionCodeTable);
    const [match] = await db.select().from(matchTable).where(eq(matchTable.id, matchId));

    console.log('redemptionCodes', redemptionCodes);

    //this should never really happen
    if (!match) {
        // throw?
        console.error(`${matchId} not found.`);
    }

    if (!redemptionCodes.map(rc => rc.code).includes(redemptionCode)) {
        //throw?
        return;
    }

    const claimQty = 1;
    let newTicketQty = match.qtyTicketsAvailable;

    if (match.qtyTicketsAvailable > 0) {
        newTicketQty = match.qtyTicketsAvailable - claimQty;
    }

    const usedRedemptionCode = redemptionCodes.find(rc => rc.code === redemptionCode) ?? {
        id: 0,
        code: ''
    };

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
            redemptionCodeId: usedRedemptionCode.id
        });
    });

    revalidatePath(`/matches/${matchId}`);
    redirect(`/matches/${matchId}`);

    return;
}
