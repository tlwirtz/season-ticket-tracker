import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Match from './Match';
import NotLoggedIn from './NotLoggedIn';

export default function UserProfile() {
    const user = useSelector(state => (_.isEmpty(state.user) ? null : state.user.user));
    const matches = useSelector(state => state.matches);
    const userMatches = user ? computeUserMatches(user, matches) : null;

    function filterUserMatches(match, userid) {
        return match.claimedUser && match.claimedUser.uid === userid;
    }

    function reduceMatches(matches) {
        return (a, b) => a.concat([matches[b]]);
    }

    function matchReducer(matches) {
        return reduceMatches(matches.data);
    }

    function computeUserMatches(user, matches) {
        return Object.keys(matches.data)
            .reduce(matchReducer(matches), [])
            .filter(match => filterUserMatches(match, user.uid));
    }

    function renderLoggedIn() {
        return (
            <div>
                <h2 className="animated fadeInUp">Your Matches</h2>
                <ul>
                    {userMatches.length > 0 ? (
                        userMatches.map(match => (
                            <li key={match.id} className="animated fadeInUp">
                                <Match key={match.id} matchData={match} condensed />
                            </li>
                        ))
                    ) : (
                        <div className="animated fadeInUp">
                            <h2 className="medium-grey-text"> You are not going to any matches</h2>
                            <h2 className="medium-grey-text">
                                {' '}
                                Find some{' '}
                                <Link className="soft-grey-text" to="/">
                                    here
                                </Link>
                            </h2>
                        </div>
                    )}
                </ul>
            </div>
        );
    }

    function renderNotLoggedIn() {
        return <NotLoggedIn />;
    }

    return (
        <div className="match-detail-container">
            <div className="match-detail-item">{user ? renderLoggedIn() : renderNotLoggedIn()}</div>
        </div>
    );
}
