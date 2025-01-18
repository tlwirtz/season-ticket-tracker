import moment from 'moment';
import Match from './Match';
import { MatchWithTeams } from '../../db/schema';

export default function MatchList({ matchData }: { matchData: MatchWithTeams[] }) {
    function isAfter(time: Date | null) {
        return moment(time).isAfter(moment());
    }

    function isBefore(time: Date | null) {
        return moment(time).isBefore(moment());
    }

    //I only want to see matches for this season.
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

    function buildMatch(match: MatchWithTeams) {
        const bg = match?.awayTeam?.img;
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
            <a
                key={id}
                href={`/matches/${id}`}
                className="match animated fadeInUp"
                style={{ backgroundImage: `url(${bg})` }}
            >
                <Match matchData={props} condensed={false} />
            </a>
        );
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
                    Available matches
                </h3>
            </div>
            <div className="match-container">{availableGames}</div>
            <div className="match-container">
                <h3 className="extra-left-margin nav-bar-subheading soft-grey-text">
                    Unavailable Matches
                </h3>
            </div>
            <div className="match-container">{reservedGames}</div>
        </section>
    );
}
