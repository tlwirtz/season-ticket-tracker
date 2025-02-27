import { db } from '../../../db/db';
import { matchTable, teamTable, ticketRedemptionTable, MatchWithTeams } from '../../../db/schema';
import { eq, aliasedTable } from 'drizzle-orm';
import { clerkClient, User } from '@clerk/nextjs/server';
import MatchGrid from '@/components/MatchGrid';
import { buildMatch } from '@/utils/buildMatchForCard';
import { RedeemedMatch } from '../../../types/match';

const awayTeam = aliasedTable(teamTable, 'awayTeam');
const homeTeam = aliasedTable(teamTable, 'homeTeam');

export default async function Admin() {
    const claimedMatches = await db
        .select()
        .from(ticketRedemptionTable)
        .innerJoin(matchTable, eq(ticketRedemptionTable.matchId, matchTable.id))
        .leftJoin(homeTeam, eq(matchTable.homeTeam, homeTeam.id))
        .leftJoin(awayTeam, eq(matchTable.awayTeam, awayTeam.id));

    //todo -- might want to consider writing new users into our
    //todo -- neon database if this gets too heavy.

    const client = clerkClient();

    const matchesWithUsers: RedeemedMatch[] = await Promise.all(
        claimedMatches.map(async redemption => {
            const { claimedUserId } = redemption.ticket_redemptions;

            if (!claimedUserId) {
                //this should never happen
                console.error(`no claimed user found for match: ${redemption.matches.matchKey}`);
                return { ...redemption, user: null } as unknown as RedeemedMatch;
            }

            const maybeUser = await client.users.getUser(claimedUserId);
            return { ...redemption, user: maybeUser ?? null } as unknown as RedeemedMatch;
        })
    );

    return (
        <div className="match-detail-container">
            <div className="match-detail-item">
                <div>
                    <h2 className="animated fadeInUp soft-grey-text text-2xl p-6 sm:p-6">
                        Claimed Matches
                    </h2>
                    {matchesWithUsers.length > 0 ? (
                        <MatchGrid
                            matches={matchesWithUsers.map(mwu => buildMatch(mwu, null))}
                            useAdminLayout={true}
                        />
                    ) : (
                        <div className="animated fadeInUp">
                            <h2 className="medium-grey-text">No Matches Claimed at this Time</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
