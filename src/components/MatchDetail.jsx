import RedeemMatch from '../components/RedeemMatch';
import '../../styles/MatchDetail.css';

export default function MatchDetail({ user, match }) {
    function ticketAvailable(match) {
        return !match.claimedUserId || match.available || match.qtyTicketsAvailable > 0;
    }

    function matchBelongToUser(userId, match) {
        return match.claimedUserId === userId;
    }

    function renderMatchAvailable(userId, match) {
        if (matchBelongToUser(userId, match)) {
            return (
                <h3 className="center-text match-detail-subtitle medium-grey-text">
                    You&apos;re going to this match!!
                </h3>
            );
        }

        if (!ticketAvailable(match)) {
            return (
                <h3 className="animated fadeInUp center-text match-detail-subtitle medium-grey-text">
                    Sorry, there are no tickets available for this match.
                </h3>
            );
        }

        return <></>;
    }

    function renderMatchDetails(match) {
        return (
            <div>
                <div className="match-detail-item">
                    <h1 className="animated fadeInUp match-detail-title">
                        {match.homeTeam.name} vs. {match.awayTeam.name}
                    </h1>
                    {ticketAvailable(match) && (
                        <div className="animated fadeInUp center">
                            <h3 className="match-detail-subtitle medium-grey-text">
                                There {match.qtyTicketsAvailable > 1 ? 'are' : 'is'}{' '}
                                {match.qtyTicketsAvailable} ticket
                                {match.qtyTicketsAvailable > 1 ? 's' : ''} available for this match.
                            </h3>
                            {user ? (
                                <RedeemMatch matchId={match.id} />
                            ) : (
                                <h3 className="match-detail-subtitle medium-grey-text">
                                    {' '}
                                    Log-in to claim this ticket for yourself!{' '}
                                </h3>
                            )}
                        </div>
                    )}
                    <div className="animated fadeInUp center-button">
                        {renderMatchAvailable(user?.uid, match)}
                    </div>
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
