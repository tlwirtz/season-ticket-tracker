import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectMatch } from '../actions/matches-actions';

import Match from './Match';

export default function MatchList({ props }) {
    const matches = useSelector(state => state.matches?.data);
    const dispatch = useDispatch();

    function onMatchClick(matchId) {
        dispatch(selectMatch(matchId));
    }

    function isAfter(time) {
        return moment(time).isAfter(moment());
    }

    function isBefore(time) {
        return moment(time).isBefore(moment());
    }

    //I only want to see matches for this season.
    function filterMatchYear(key) {
        const { timestamp } = matches[key];
        return moment(timestamp).isSameOrAfter(moment(), 'year');
    }

    function filterMatch(test) {
        return key => {
            const { available, timestamp } = matches[key];
            if (test) {
                return available === test && isAfter(timestamp);
            }

            //the ticket is taken or the game is in the past.
            return available === test || isBefore(timestamp);
        };
    }

    function buildMatch(key) {
        const bg = matches[key]?.awayTeam?.img;
        return (
            <Link
                key={key}
                to={`/matches/${key}`}
                className="match animated fadeInUp"
                style={{ backgroundImage: `url(${bg})` }}
                onClick={() => onMatchClick(key)}
            >
                <Match matchData={matches[key]} {...props} />
            </Link>
        );
    }

    const gamesThisYear = Object.keys(matches).filter(filterMatchYear);
    const availableGames = gamesThisYear.filter(filterMatch(true)).map(buildMatch);
    const reservedGames = gamesThisYear.filter(filterMatch(false)).map(buildMatch);

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
