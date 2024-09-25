import { db } from '../../../../db/db';
import { matchTable, teamTable, redemptionCodeTable } from '../../../../db/schema';
import { eq, aliasedTable } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import MatchDetail from '../../../components/MatchDetail';
import { currentUser } from '@clerk/nextjs/server';

const awayTeam = aliasedTable(teamTable, 'awayTeam');
const homeTeam = aliasedTable(teamTable, 'homeTeam');

export default async function Page({ params }: { params: { matchId: number } }) {
    /**
     * Need to get the match id from the params and then fetch from the database.
     * Afterwards, we can load it on the page
     */

    const user = await currentUser();
    const [matchData] = await db
        .select()
        .from(matchTable)
        .leftJoin(homeTeam, eq(matchTable.homeTeam, homeTeam.id))
        .leftJoin(awayTeam, eq(matchTable.awayTeam, awayTeam.id))
        .where(eq(matchTable.id, params.matchId));

    if (!matchData || !user) {
        //probably a bad match id
        redirect('/matches');
    }
    const matchMapped = {
        ...matchData.matches,
        homeTeam: matchData.homeTeam, //todo -- figure out how to fix type errors
        awayTeam: matchData.awayTeam
    };

    console.log('match', matchMapped);

    const { id, firstName, lastName } = user;
    return <MatchDetail user={{ uid: id, firstName, lastName }} match={matchMapped} />;
}
