import { MatchHeader } from '@/components/matches/MatchHeader';
import { MatchDetails } from '@/components/matches/MatchDetails';
import { TicketClaim } from '@/components/matches/TicketClaim';
import { currentUser } from '@clerk/nextjs/server';
import { aliasedTable, eq } from 'drizzle-orm';
import { db } from '../../../../db/db';
import { matchTable, MatchWithTeams, teamTable } from '../../../../db/schema';
import { redirect } from 'next/navigation';
import { RedeemedHeader } from '@/components/matches/RedeemedHeader';

interface MatchDetailPageProps {
    params: {
        id: number;
    };
}

const awayTeam = aliasedTable(teamTable, 'awayTeam');
const homeTeam = aliasedTable(teamTable, 'homeTeam');

export default async function MatchDetailPage({ params }: MatchDetailPageProps) {
    function matchBelongToUser(userId: string, match: MatchWithTeams) {
        return match.matches.claimedUserId === userId;
    }

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
        .where(eq(matchTable.id, params.id))) as unknown as MatchWithTeams[];

    if (!matchData) {
        //probably a bad match id
        redirect('/matches');
    }

    //todo -- get all the types for this sorted out
    const matchMapped = {
        ...matchData.matches,
        homeTeam: matchData.homeTeam,
        awayTeam: matchData.awayTeam,
        ticketTiers: [
            {
                id: 'GA',
                name: 'Emerald City Supporters - GA',
                availableCount: matchData.matches.qtyTicketsAvailable,
                price: matchData.matches.ticketPrice
            }
        ]
    };

    console.log('match', matchMapped);

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                {matchBelongToUser(user?.id ?? '', matchData) && <RedeemedHeader />}
                <MatchHeader homeTeam={matchMapped.homeTeam} awayTeam={matchMapped.awayTeam} />
                <MatchDetails dateTime={matchMapped.timestamp} location={matchMapped.location} />
                <TicketClaim matchId={matchMapped.id} ticketTiers={matchMapped.ticketTiers} />
            </div>
        </main>
    );
}
