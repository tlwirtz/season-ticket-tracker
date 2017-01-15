import React, { Component } from 'react';
import { Link } from 'react-router'
import '../styles/Match.css';


class Match extends Component {
  render() {
    const { id, homeTeam, awayTeam, date, time, matchType, location, ticketPrice } = this.props.matchData
    return (
      <div className="match-container">
        <img src={awayTeam.img} className="match-logo" alt="logo" />
        <div>
          <Link to={`/matches/${id}`}>
            <h1>{homeTeam.name} vs {awayTeam.name}</h1>
          </Link>
          <h2>{location} | {date} | {time} | {matchType} | {ticketPrice}</h2>
          <button onClick={this.props.claimTicket}>Claim Ticket</button>
        </div>
      </div>
    )
  }
}

Match.propTypes =  {
  matchData: React.PropTypes.object.isRequired,
};

export default Match
