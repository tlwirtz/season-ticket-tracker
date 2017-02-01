import React, { Component } from 'react';
import { Link } from 'react-router'
import '../styles/Match.css';

class Match extends Component {
  render() {
    const { id, homeTeam, awayTeam, date, time, matchType, location, ticketPrice } = this.props.matchData
    return (

        <div>
          <Link to={`/matches/${id}`} onClick={() => this.props.onMatchClick(id)} >
          <div className="desc" >
            <h3>{awayTeam.name}</h3>
            <p>
              {date.toUpperCase()} - {time}
            </p>
             <p>
              ${(ticketPrice / 100).toFixed(2)}
            </p>
          </div>
        </Link>
        </div>
    )
  }
}

Match.propTypes =  {
  matchData: React.PropTypes.object.isRequired,
};

export default Match
