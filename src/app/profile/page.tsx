import { db } from '../../../db/db';
import { currentUser } from '@clerk/nextjs/server';
import { eq, aliasedTable } from 'drizzle-orm';
import { matchTable, teamTable, ticketRedemptionTable, MatchWithTeams } from '../../../db/schema';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import MatchGrid from '@/components/MatchGrid';
import { buildMatch } from '@/utils/buildMatchForCard';

const awayTeam = aliasedTable(teamTable, 'awayTeam');
const homeTeam = aliasedTable(teamTable, 'homeTeam');

export default async function Profile() {
    const user = await currentUser();
    if (!user) {
        return redirect('/sign-in');
    }
    const matchList = (await db
        .select()
        .from(matchTable)
        .leftJoin(homeTeam, eq(matchTable.homeTeam, homeTeam.id))
        .leftJoin(awayTeam, eq(matchTable.awayTeam, awayTeam.id))
        .innerJoin(ticketRedemptionTable, eq(ticketRedemptionTable.matchId, matchTable.id))
        .where(eq(ticketRedemptionTable.claimedUserId, user.id))) as unknown as MatchWithTeams[];

    function renderLoggedIn() {
        return (
            <div>
                {matchList.length > 0 ? (
                    <MatchGrid matches={matchList.map(match => buildMatch(match, user))} />
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
            </div>
        );
    }

    return (
        <div className="match-detail-container">
            <div className="match-detail-item">{renderLoggedIn()}</div>
        </div>
    );
}
