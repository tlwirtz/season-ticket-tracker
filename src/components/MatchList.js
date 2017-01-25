import React, { Component } from 'react'
import Match from './Match'

class MatchList extends Component {
  render() {
    const items = Object.keys(this.props.matches).map((key) => {
      const bg = this.props.matches[key].awayTeam.img
      return (
        <div key={key} className='match' style={{backgroundImage: `url(${bg})`}} >
          <Match
            matchData={this.props.matches[key]}
            {...this.props}/>
        </div>
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
