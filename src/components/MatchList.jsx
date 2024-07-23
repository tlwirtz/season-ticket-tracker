import moment from 'moment';
import Match from './Match';
import { timestamp } from 'drizzle-orm/mysql-core';

export default function MatchList({ matchData }) {
    function isAfter(time) {
        return moment(time).isAfter(moment());
    }

    function isBefore(time) {
        return moment(time).isBefore(moment());
    }

    //I only want to see matches for this season.
    function filterMatchYear(match) {
        const { timestamp } = match;
        return moment(timestamp).isSameOrAfter(moment(), 'year');
    }

    function filterMatch(test) {
        return match => {
            const { available, timestamp } = match.matches;
            if (test) {
                return available === test && isAfter(timestamp);
            }

            //the ticket is taken or the game is in the past.
            return available === test || isBefore(timestamp);
        };
    }

    function buildMatch(match) {
        const bg = match?.awayTeam?.img;
        const { id, location, claimedUser, timeStamp, ticketPrice } = match.matches;

        const props = {
            id,
            location,
            claimedUser,
            timeStamp,
            ticketPrice,
            awayTeam: match.awayTeam
        };

        return (
            <a
                key={match.matches.id}
                href={`/matches/${match.matches.id}`}
                className="match animated fadeInUp"
                style={{ backgroundImage: `url(${bg})` }}
            >
                <Match matchData={props} condensed={false} />
            </a>
        );
    }

    const gamesThisYear = matchData.filter(filterMatchYear);
    const availableGames = gamesThisYear.filter(filterMatch(true)).map(buildMatch);
    const reservedGames = gamesThisYear.filter(filterMatch(false)).map(buildMatch);

    console.log('available', availableGames);
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
