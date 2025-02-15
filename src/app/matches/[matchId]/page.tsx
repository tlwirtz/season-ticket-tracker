import { db } from '../../../../db/db';
import { matchTable, teamTable, MatchWithTeams } from '../../../../db/schema';
import { eq, aliasedTable } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import MatchDetail from '../../../components/MatchDetail';
import { currentUser } from '@clerk/nextjs/server';
import '../../../../styles/Match.css';

const awayTeam = aliasedTable(teamTable, 'awayTeam');
const homeTeam = aliasedTable(teamTable, 'homeTeam');

export default async function Page({ params }: { params: { matchId: number } }) {
    /**
     * Need to get the match id from the params and then fetch from the database.
     * Afterwards, we can load it on the page
     */

    const user = await currentUser();
    const [matchData] = (await db
        .select()
        .from(matchTable)
        .leftJoin(homeTeam, eq(matchTable.homeTeam, homeTeam.id))
        .leftJoin(awayTeam, eq(matchTable.awayTeam, awayTeam.id))
        .where(eq(matchTable.id, params.matchId))) as unknown as MatchWithTeams[];

    if (!matchData) {
        //probably a bad match id
        redirect('/matches');
    }
    const matchMapped = {
        ...matchData.matches,
        homeTeam: matchData.homeTeam,
        awayTeam: matchData.awayTeam
    };

    console.log('match', matchMapped);

    let maybeUser = null;

    if (user) {
        const { id, firstName, lastName } = user;
        maybeUser = { uid: id, firstName, lastName };
    }
    return <MatchDetail user={maybeUser} match={matchMapped} />;
}
