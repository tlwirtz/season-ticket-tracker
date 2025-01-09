import _ from 'lodash';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectMatch } from '../actions/matches-actions';
import RedeemMatch from './RedeemMatch';
import '../styles/MatchDetail.css';

export default function MatchDetail() {
    const params = useParams();
    const dispatch = useDispatch();
    const match = useSelector(state => state.matches.data[state.matches.selectedMatch]);
    const alert = useSelector(state => state.alert.visible);
    const user = useSelector(state => (!_.isEmpty(state.user) ? state.user.user : null));

    useEffect(() => {
        dispatch(selectMatch(params.matchId));
        return () => dispatch(selectMatch(null));
    });

    function ticketAvailable(match) {
        return !match.claimedUser || match.available || match.qtyTicketsAvailable > 0;
    }

    function matchBelongToUser(userId, match) {
        return match.claimedUser.uid === userId;
    }

    function renderMatchAvailable(userId, match) {
        if (matchBelongToUser(userId, match)) {
            return (
                <h3 className="center-text match-detail-subtitle medium-grey-text">
                    You're going to this match!!
                </h3>
            );
        }

        return (
            <h3 className="animated fadeInUp center-text match-detail-subtitle medium-grey-text">
                Sorry, there are no tickets available for this match.
            </h3>
        );
    }

    function renderMatchDetails(match) {
        return (
            <div>
                <div className="match-detail-item">
                    <h1 className="animated fadeInUp match-detail-title">
                        {match.homeTeam.name} vs. {match.awayTeam.name}
                    </h1>
                    {ticketAvailable(match) ? (
                        <div className="animated fadeInUp center">
                            <h3 className="match-detail-subtitle medium-grey-text">
                                There {match.qtyTicketsAvailable > 1 ? 'are' : 'is'}{' '}
                                {match.qtyTicketsAvailable} ticket
                                {match.qtyTicketsAvailable > 1 ? 's' : ''} available for this match.
                            </h3>
                            {user ? (
                                <RedeemMatch user={user} matchId={params.matchId} /> // need to pass in other props
                            ) : (
                                <h3 className="match-detail-subtitle medium-grey-text">
                                    {' '}
                                    Log-in to claim this ticket for yourself!{' '}
                                </h3>
                            )}
                        </div>
                    ) : (
                        <div className="animated fadeInUp center-button">
                            {user
                                ? renderMatchAvailable(user.uid, match)
                                : renderMatchAvailable(null, match)}
                        </div>
                    )}
                </div>
                <div className="animated fadeInUp match-detail-group">
                    <div className="match-detail-item">
                        <h4 className="match-detail-text medium-grey-text">
                            {match.date} - {match.time}
                        </h4>
                        <h4 className="match-detail-text medium-grey-text">{match.location}</h4>
                        <h4 className="match-detail-text medium-grey-text">
                            ${(match.ticketPrice / 100).toFixed(2)} each
                        </h4>
                    </div>

                    <div className="match-detail-item">
                        <img
                            className="away-team-img"
                            src={match.awayTeam.img}
                            alt={match.awayTeam.name}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return <div className="match-detail-container">{match ? renderMatchDetails(match) : ''}</div>;
}
