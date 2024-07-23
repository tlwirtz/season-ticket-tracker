import moment from 'moment';

export default function Match(props) {
    function renderMatchCard() {
        const { timestamp, awayTeam, ticketPrice } = props.matchData;

        return (
            <div className="desc">
                <h3>{awayTeam.name}</h3>
                <p>{moment(timestamp).format('dddd, MMMM D YYYY - h:mm A').toLocaleUpperCase()} </p>
                <p> ${(ticketPrice / 100).toFixed(2)} </p>
            </div>
        );
    }

    function renderMatchCondensed() {
        const { timestamp, id, awayTeam, location, claimedUser } = props.matchData;
        const { admin } = props;

        return (
            <a href={`/matches/${id}`}>
                <div className="match-condensed">
                    <h3 className="match-condensed-heading">{awayTeam.name}</h3>
                    <h5 className="match-condensed-subheading medium-grey-text">
                        {moment(timestamp).format('dddd, MMMM D - h:mm A').toUpperCase()}
                    </h5>
                    <h5 className="match-condensed-subheading medium-grey-text">{location}</h5>
                    {admin ? (
                        <h5 className="match-condensed-subheading medium-grey-text">
                            {claimedUser?.displayName ?? ''}
                        </h5>
                    ) : null}
                </div>
            </a>
        );
    }

    return <div>{props.condensed ? renderMatchCondensed() : renderMatchCard()}</div>;
}
