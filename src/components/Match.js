import React, { Component } from 'react';
import { Link } from 'react-router'
import '../styles/Match.css';

class Match extends Component {
  constructor(props) {
    super(props)

    this.renderMatchCard = this.renderMatchCard.bind(this)
    this.renderMatchCondensed = this.renderMatchCondensed.bind(this)
  }

  renderMatchCard() {
    const { id, homeTeam, awayTeam, date, time, matchType, location, ticketPrice } = this.props.matchData

    return (
      // <Link to={`/matches/${id}`} onClick={() => this.props.onMatchClick(id)} >
        <div className="desc" >
          <h3>{awayTeam.name}</h3>
          <p>
            {date.toUpperCase()} - {time}
          </p>
           <p>
            ${(ticketPrice / 100).toFixed(2)}
          </p>
        </div>
      // </Link>
    )
  }

  renderMatchCondensed() {
    const { id, homeTeam, awayTeam, date, time, matchType, location, ticketPrice } = this.props.matchData

    return (
      <Link to={`/matches/${id}`}>
        <div className="match-condensed">
          <h3 className="match-condensed-heading">{awayTeam.name}</h3>
          <h5 className="match-condensed-subheading medium-grey-text">{date} - {time}</h5>
          <h5 className="match-condensed-subheading medium-grey-text">{location}</h5>
        </div>
      </Link>
    )
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
    )
  }
}

Match.propTypes =  {
  matchData: React.PropTypes.object.isRequired,
};

export default Match
