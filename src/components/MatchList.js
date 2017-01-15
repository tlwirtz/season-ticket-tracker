import React, { Component } from 'react'
import Match from './Match'

class MatchList extends Component {
  render() {
    return (
      <div>
        {
          Object.keys(this.props.route.matches).map((key) =>
            <Match
              key={key}
              matchData={this.props.route.matches[key]}
              claimTicket={(e) => this.props.route.claimTicket(e, key)}/>
            )
        }
    </div>
    )
  }
}

export default MatchList
