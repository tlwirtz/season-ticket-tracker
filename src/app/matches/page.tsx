import { db } from '../../../db/db';
import { matchTable, teamTable } from '../../../db/schema';
import { eq, aliasedTable } from 'drizzle-orm';
import MatchList from '../../components/MatchList';
import '../../../styles/Match.css';

const awayTeam = aliasedTable(teamTable, 'awayTeam');
const homeTeam = aliasedTable(teamTable, 'homeTeam');

export default async function Matches() {
    /**
     * Returns an array of objects like:
     * [{
     *  matches: {...matchData},
     *  homeTeam: {...team}
     *  awayTeam: {...team}
     * }]
     */
    const matches = await db
        .select()
        .from(matchTable)
        .leftJoin(homeTeam, eq(matchTable.homeTeam, homeTeam.id))
        .leftJoin(awayTeam, eq(matchTable.awayTeam, awayTeam.id));

    return (
        <>
            <MatchList matchData={matches} />
        </>
    );
}
