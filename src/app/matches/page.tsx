import { db } from '../../../db/db';
import { matchTable, teamTable } from '../../../db/schema';
import { eq, aliasedTable } from 'drizzle-orm';

const awayTeam = aliasedTable(teamTable, 'awayTeam');

export default async function Matches() {
    const matches = await db
        .select()
        .from(matchTable)
        .leftJoin(teamTable, eq(matchTable.homeTeam, teamTable.id))
        .leftJoin(awayTeam, eq(matchTable.awayTeam, awayTeam.id));

    return (
        <div>
            {/* <p>{JSON.stringify(matches[0])}</p> */}
            {matches.length &&
                matches.map(match => {
                    return (
                        <p>
                            MatchId: {match.matches.id} - {match.teams?.name ?? ''} vs.{' '}
                            {match.awayTeam?.name}
                            {/* Not sure how to get this ^ type error to go away. */}
                        </p>
                    );
                })}
        </div>
    );
}
