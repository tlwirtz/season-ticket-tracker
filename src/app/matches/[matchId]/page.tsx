import { db } from '../../../../db/db';
import { matchTable, teamTable, redemptionCodeTable } from '../../../../db/schema';
import { eq, aliasedTable } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import MatchDetail from '../../../components/MatchDetail';

const awayTeam = aliasedTable(teamTable, 'awayTeam');
const homeTeam = aliasedTable(teamTable, 'homeTeam');

export default async function Page({ params }: { params: { matchId: number } }) {
    /**
     * Need to get the match id from the params and then fetch from the database.
     * Afterwards, we can load it on the page
     */

    //todo -- this should get the user from the auth context
    //todo -- I'm not even sure if we need to inject this in.
    const user = { userId: 939394839, uid: 9393920293, name: 'taylor' };
    const [matchData] = await db
        .select()
        .from(matchTable)
        .leftJoin(homeTeam, eq(matchTable.homeTeam, homeTeam.id))
        .leftJoin(awayTeam, eq(matchTable.awayTeam, awayTeam.id))
        .where(eq(matchTable.id, params.matchId));

    if (!matchData) {
        //probably a bad match id
        redirect('/matches');
    }
    const matchMapped = {
        ...matchData.matches,
        homeTeam: matchData.homeTeam, //todo -- figure out how to fix type errors
        awayTeam: matchData.awayTeam
    };

    console.log('match', matchMapped);

    return <MatchDetail user={user} match={matchMapped} />;
}
