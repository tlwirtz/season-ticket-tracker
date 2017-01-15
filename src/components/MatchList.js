import React, { Component } from 'react'
import Match from './Match'

class MatchList extends Component {
  render() {
    return (
      <div>
        {
          Object.keys(this.props.matches).map((key) =>
            <Match
              key={key}
              matchData={this.props.matches[key]}
              claimTicket={(e) => this.props.claimTicket(e, key)}/>
            )
        }
    </div>
    )
  }
}

export default MatchList
