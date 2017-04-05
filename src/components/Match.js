import React, { Component, PropTypes as T } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import '../styles/Match.css';

export class Match extends Component {
  constructor(props) {
    super(props);

    this.renderMatchCard = this.renderMatchCard.bind(this);
    this.renderMatchCondensed = this.renderMatchCondensed.bind(this);
  }

  renderMatchCard() {
    const { timestamp, awayTeam, ticketPrice } = this.props.matchData;

    return (
      <div className="desc" >
        <h3>{awayTeam.name}</h3>
        <p> {moment(timestamp).format('dddd, MMMM D - h:mm A').toUpperCase()} </p>
        <p> ${(ticketPrice / 100).toFixed(2)} </p>
      </div>
    );
  }

  renderMatchCondensed() {
    const { timestamp, id, awayTeam, location, claimedUser } = this.props.matchData;
    const { admin } = this.props

    return (
      <Link to={`/matches/${id}`}>
        <div className="match-condensed">
          <h3 className="match-condensed-heading">{awayTeam.name}</h3>
          <h5 className="match-condensed-subheading medium-grey-text">{moment(timestamp).format('dddd, MMMM D - h:mm A').toUpperCase()}</h5>
          <h5 className="match-condensed-subheading medium-grey-text">{location}</h5>
          {
            admin
              ? <h5 className="match-condensed-subheading medium-grey-text">{claimedUser.displayName}</h5>
              : null
          }
        </div>
      </Link>
    );
  }

  render() {
    return (
      <div>
        {
          this.props.condensed
            ? this.renderMatchCondensed()
            : this.renderMatchCard()
        }
      </div>
    );
  }
}

Match.propTypes = {
  matchData: T.object.isRequired,
  condensed: T.bool,
  admin: T.bool,
};

export default Match;
