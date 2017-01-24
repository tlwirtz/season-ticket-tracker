import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router'
import '../styles/Match.css';


class Match extends Component {
  render() {
    const { id, homeTeam, awayTeam, date, time, matchType, location, ticketPrice } = this.props.matchData
    return (
      <ReactCSSTransitionGroup
        transitionName="match-animiation"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        className="match"
        style={{backgroundImage: `url(${awayTeam.img})`}}
        >
        <div >
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
      </ReactCSSTransitionGroup >
    )
  }
}

Match.propTypes =  {
  matchData: React.PropTypes.object.isRequired,
};

export default Match
