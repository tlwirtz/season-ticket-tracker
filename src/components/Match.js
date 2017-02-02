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

  renderMatchCondensed() {
    const { id, homeTeam, awayTeam, date, time, matchType, location, ticketPrice } = this.props.matchData

    return (
      <div className="match-condensed ">
        <h3 className="match-condensed-heading">{awayTeam.name} vs.</h3>
        <h3 className="match-condensed-subheading soft-grey-text">{homeTeam.name}</h3>
        <h3 className="match-condensed-subheading soft-grey-text">CENTER BLOCK VERTICALLY IN BOX</h3>
      </div>
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
