import React, { Component } from 'react'
import Match from './Match'
import matches from '../fakeMatchData'
import '../styles/App.css'

//TODO -- this is a nice proof of concept.
//TODO -- need to hookup with multiple matches
//TODO -- sync to firebase
//TODO -- add authentication

class Home extends Component {
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

export default Home;
