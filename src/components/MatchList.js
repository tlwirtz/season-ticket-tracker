import React, { Component } from 'react'
import { Link } from 'react-router'
import Match from './Match'

class MatchList extends Component {
  render() {
    const items = Object.keys(this.props.matches).map((key) => {
      const bg = this.props.matches[key].awayTeam.img
      return (
        <Link
          key={key} to={`/matches/${key}`}
          className='match animated fadeInUp'
          style={{backgroundImage: `url(${bg})`}}
          onClick={() => this.props.onMatchClick(key)} >
            <Match
              matchData={this.props.matches[key]}
              {...this.props}/>
        </Link>
      )
    }
  )
    return (
      <div className='match-container'>
        { items }
      </div>
    )
  }
}

export default MatchList
