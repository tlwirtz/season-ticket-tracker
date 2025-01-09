import { db } from '../../../db/db';
import { currentUser } from '@clerk/nextjs/server';
import { eq, aliasedTable } from 'drizzle-orm';
import { matchTable, teamTable, ticketRedemptionTable, MatchWithTeams } from '../../../db/schema';
import { redirect } from 'next/navigation';
import Match from '@/components/Match';
import Link from 'next/link';

const awayTeam = aliasedTable(teamTable, 'awayTeam');
const homeTeam = aliasedTable(teamTable, 'homeTeam');

export default async function Profile() {
    const user = await currentUser();
    if (!user) {
        redirect('/sign-in');
    }
    const matchList = await db
        .select()
        .from(matchTable)
        .leftJoin(homeTeam, eq(matchTable.homeTeam, homeTeam.id))
        .leftJoin(awayTeam, eq(matchTable.awayTeam, awayTeam.id))
        .innerJoin(ticketRedemptionTable, eq(ticketRedemptionTable.matchId, matchTable.id))
        .where(eq(ticketRedemptionTable.claimedUserId, user.id)) as unknown as MatchWithTeams[]

    function buildMatch(match: MatchWithTeams) {
        const { id, location, claimedUserId, timestamp, ticketPrice } = match.matches;

        const props = {
            id,
            location,
            claimedUserId,
            timestamp,
            ticketPrice,
            awayTeam: match.awayTeam
        };

        return (
            <li key={id} className="animated fadeInUp">
                <Match key={id} matchData={props} condensed />
            </li>
        );
    }


    function renderLoggedIn() {
        return (
            <div>
                <h2 className="animated fadeInUp">Your Matches</h2>
                <ul>
                    {matchList.length > 0 ? (
                        matchList.map(buildMatch)
                    ) : (
                        <div className="animated fadeInUp">
                            <h2 className="medium-grey-text"> You are not going to any matches</h2>
                            <h2 className="medium-grey-text">
                                {' '}
                                Find some{' '}
                                <Link className="soft-grey-text" href="/">
                                    here
                                </Link>
                            </h2>
                        </div>
                    )}
                </ul>
            </div>
        );
    }

    return (
        <div className="match-detail-container">
            <div className="match-detail-item">{renderLoggedIn()}</div>
        </div>
    );
}
