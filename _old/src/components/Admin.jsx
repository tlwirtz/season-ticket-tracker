import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkIfAdmin } from '../actions/user-actions';
import Match from './Match';

export default function Admin() {
    const user = useSelector(state => (_.isEmpty(state.user) ? null : state.user.user));
    const matches = useSelector(state => (state.matches ? state.matches : []));
    const [isAdmin, setIsAdmin] = useState(false);
    const claimedMatches = filterClaimedMatches(matches);

    //fetch current list of admins
    useEffect(() => {
        let ignore = false;

        checkIfAdmin(user?.uid).then(result => {
            if (!ignore) {
                setIsAdmin(result);
            }
        });
        return () => {
            ignore = true;
        };
    }, [user]);

    function filterClaimedMatches(matches) {
        function reduceMatches(matches) {
            return (a, b) => a.concat([matches[b]]);
        }

        function matchReducer(matches) {
            return reduceMatches(matches.data);
        }

        return Object.keys(matches.data)
            .reduce(matchReducer(matches), [])
            .filter(match => !match.available && match.claimedUser);
    }

    function renderAdmin() {
        return (
            <div>
                <h2 className="animated fadeInUp">
                    ClaimedMatches
                    <ul>
                        {claimedMatches.length > 0 ? (
                            claimedMatches.map(match => (
                                <li key={match.id} className="animated fadeInUp">
                                    <Match key={match.id} matchData={match} condensed admin />
                                </li>
                            ))
                        ) : (
                            <div className="animated fadeInUp">
                                <h2 className="medium-grey-text">
                                    No Matches Claimed at this Time
                                </h2>
                            </div>
                        )}
                    </ul>
                </h2>
            </div>
        );
    }

    function renderNotAdmin() {
        return (
            <div>
                <h1 className="match-detail-title"> Oh no! You don't have access to this page.</h1>
            </div>
        );
    }

    return (
        <div className="match-detail-container">
            <div className="match-detail-item">{isAdmin ? renderAdmin() : renderNotAdmin()}</div>
        </div>
    );
}
