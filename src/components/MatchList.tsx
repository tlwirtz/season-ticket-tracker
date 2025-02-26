import moment from 'moment';
import { MatchWithTeams } from '../../db/schema';
import MatchGrid from './MatchGrid';
import { currentUser } from '@clerk/nextjs/server';
import { Match } from '../../types/match';

export default async function MatchList({ matchData }: { matchData: MatchWithTeams[] }) {
    const user = await currentUser();

    function isAfter(time: Date | null) {
        return moment(time).isAfter(moment());
    }

    function isBefore(time: Date | null) {
        return moment(time).isBefore(moment());
    }

    //I only want to see matches for this season.
    //todo -- we should adjust our db query to only pull matches
    //todo -- for the season and then get rid of this.
    function filterMatchYear({ matches: match }: MatchWithTeams) {
        const { timestamp } = match;
        return moment(timestamp).isSameOrAfter(moment(), 'year');
    }

    function filterMatch(test: boolean) {
        return (match: MatchWithTeams) => {
            const { available, timestamp } = match.matches;
            if (test) {
                return available === test && isAfter(timestamp);
            }

            //the ticket is taken or the game is in the past.
            return available === test || isBefore(timestamp);
        };
    }

    function buildMatch(match: MatchWithTeams): Match {
        const { id, location, claimedUserId, timestamp, ticketPrice } = match.matches;
        return {
            id,
            venue: location,
            city: 'Seattle, WA', //todo -- add to db
            dateTime: timestamp,
            ticketPrice,
            homeTeam: {
                id: match.homeTeam.id,
                name: match.homeTeam.name,
                logoUrl: match.homeTeam.img
            },
            awayTeam: {
                id: match.awayTeam.id,
                name: match.awayTeam.name,
                logoUrl: match.awayTeam.img
            },
            isUserAttending: Boolean(user?.id && claimedUserId && user?.id === claimedUserId)
        };
    }

    //todo -- there's likely some bugs here b/c the timestamps and server are all in UTC.
    //todo -- we might need a way to tell the server the user's local timezone.
    const gamesThisYear = matchData.filter(filterMatchYear);
    const availableGames = gamesThisYear
        .filter(filterMatch(true))
        .sort((a, b) => moment(a.matches.timestamp).unix() - moment(b.matches.timestamp).unix())
        .map(buildMatch);
    const reservedGames = gamesThisYear.filter(filterMatch(false)).sort().map(buildMatch);

    return (
        <section>
            <div className="match-container">
                <h3 className="extra-left-margin nav-bar-subheading soft-grey-text">
                    Upcoming matches
                </h3>
            </div>
            <div className="max-w-7xl mx-auto py-2">
                <MatchGrid matches={availableGames} />
            </div>
            <div className="match-container">
                <h3 className="extra-left-margin nav-bar-subheading soft-grey-text">
                    Previous Matches
                </h3>
            </div>
            <div className="max-w-7xl mx-auto py-8">
                <MatchGrid matches={reservedGames} />
            </div>
        </section>
    );
}
