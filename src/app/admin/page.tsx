import { db } from '../../../db/db';
import { matchTable, teamTable, ticketRedemptionTable, MatchWithTeams } from '../../../db/schema';
import { eq, aliasedTable } from 'drizzle-orm';
import { clerkClient, User } from '@clerk/nextjs/server';
import Match from '@/components/Match';

const awayTeam = aliasedTable(teamTable, 'awayTeam');
const homeTeam = aliasedTable(teamTable, 'homeTeam');

type RedeemedMatch = MatchWithTeams & { user: User };

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

    const matchesWithUsers = await Promise.all(
        claimedMatches.map(async redemption => {
            if (redemption.ticket_redemptions.claimedUserId) {
                const maybeUser = await client.users.getUser(
                    redemption.ticket_redemptions.claimedUserId
                );

                if (maybeUser) {
                    return { ...redemption, user: maybeUser } as unknown as RedeemedMatch;
                }

                console.error(`User not found for match ${redemption.matches.matchKey}`);
            }
            return { ...redemption, user: null } as unknown as RedeemedMatch;
        })
    );

    return (
        <div className="match-detail-container">
            <div className="match-detail-item">
                <div>
                    <h2 className="animated fadeInUp">
                        Claimed Matches
                        <ul>
                            {matchesWithUsers.length > 0 ? (
                                matchesWithUsers.map(match => (
                                    <li key={match.matches.id} className="animated fadeInUp">
                                        <div className="match-condensed-subheading medium-grey-text">
                                            {match.user && match.user.emailAddresses.length
                                                ? match.user.emailAddresses[0].emailAddress
                                                : 'No Email Found'}
                                        </div>
                                        <Match
                                            key={match.matches.id}
                                            matchData={match.matches}
                                            condensed
                                            admin
                                        />
                                    </li>
                                ))
                            ) : (
                                <div className="animated fadeInUp">
                                    <h2 className="medium-grey-text">
                                        No Matches Claimed at this Time
                                    </h2>
                                </div>
                            )}
                        </ul>
                    </h2>
                </div>
            </div>
        </div>
    );
}
