import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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
              $20.00
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
