import React, { Component } from 'react';
import '../styles/Match.css';


class Match extends Component {
  render() {
    const { homeTeam, awayTeam, date, time, matchType, location, ticketPrice } = this.props.matchData
    return (
      <div className="match-container">
        <img src={awayTeam.img} className="match-logo" alt="logo" />
        <div>
          <h1>{homeTeam.name} vs {awayTeam.name}</h1>
          <h2>{location} | {date} | {time} | {matchType} | {ticketPrice}</h2>
          <button onClick={this.props.claimTicket}>Claim Ticket</button>
        </div>
      </div>
    )
  }
}

Match.propTypes =  {
  matchData: React.PropTypes.object.isRequired,
  claimTicket: React.PropTypes.func.isRequired
};

export default Match
