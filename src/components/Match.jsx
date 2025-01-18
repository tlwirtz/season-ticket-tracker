'use client';
import moment from 'moment';
import { useState, useEffect, CSSProperties } from 'react';

export default function Match(props) {
    //we have to do this crazy stuff because the time gets
    //rendered on the server in UTC and we need it to render in the client timezone.
    const [currentTime, setCurrentTime] = useState(() => {
        return moment(props.matchData.timestamp)
            .format('dddd, MMMM D YYYY - h:mm A')
            .toLocaleUpperCase();
    });

    const [showTimeField, setShowTimeField] = useState(() => {
        return false;
    });

    useEffect(() => {
        setCurrentTime(() => {
            return moment(props.matchData.timestamp)
                .format('dddd, MMMM D YYYY - h:mm A')
                .toLocaleUpperCase();
        });

        setShowTimeField(() => true);
    }, []);

    function renderMatchCard() {
        const { timestamp, awayTeam, ticketPrice } = props.matchData;
        return (
            <div className="desc">
                <h3>{awayTeam.name}</h3>
                <p style={{ visibility: showTimeField ? 'visible' : 'hidden' }}>{currentTime}</p>
                <p> ${(ticketPrice / 100).toFixed(2)} </p>
            </div>
        );
    }

    function renderMatchCondensed() {
        const { timestamp, id, awayTeam, location, claimedUser } = props.matchData;
        const { admin } = props;

        console.log('match', props.matchData);

        return (
            <a href={`/matches/${id}`}>
                <div className="match-condensed">
                    <h3 className="match-condensed-heading">{awayTeam.name}</h3>
                    <h5
                        style={{ visibility: showTimeField ? 'visible' : 'hidden' }}
                        className="match-condensed-subheading medium-grey-text"
                    >
                        {currentTime}
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
