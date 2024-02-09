import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectMatch } from '../actions/matches-actions';

import Match from './Match';

export default function MatchList({ props }) {
    const matches = useSelector(state => state.matches?.data);
    console.log('matches', matches);
    const dispatch = useDispatch();

    function onMatchClick(matchId) {
        dispatch(selectMatch(matchId));
    }

    function isAfter(time) {
        console.log(moment(time).toISOString());
        return moment(time).isAfter(moment());
    }

    function isBefore(time) {
        return moment(time).isBefore(moment());
    }

    function filterMatch(test) {
        return key => {
            const { available, timestamp } = matches[key];
            if (test) {
                return available === test && isAfter(timestamp);
            }

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

    const availableGames = Object.keys(matches).filter(filterMatch(true)).map(buildMatch);
    const reservedGames = Object.keys(matches).filter(filterMatch(false)).map(buildMatch);

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
