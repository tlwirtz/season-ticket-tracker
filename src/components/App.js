import React, { Component } from 'react'
import Home from './Home'
import matches from '../fakeMatchData'
import '../styles/App.css'

//TODO -- this is a nice proof of concept.
//TODO -- need to hookup with multiple matches
//TODO -- sync to firebase
//TODO -- add authentication
//TODO
class App extends Component {
  constructor(props) {
    super(props)
    this.claimTicket = this.claimTicket.bind(this)
    this.ticketAvailable = this.ticketAvailable.bind(this)

    this.state = {
      matches,
      user: { uid: "randomUID" }
    }
  }

  claimTicket(e, matchId) {
    e.preventDefault();
    const { matches } = this.state
    if (this.ticketAvailable(matches[matchId])) {
      matches[matchId].claimedUserId = this.state.user.uid
      matches[matchId].available = false
      return this.setState({ matches })
    }
  }

  ticketAvailable(match) {
    if (match.claimedUser || !match.available) return false
    return true
  }

  render() {
    return (
      <Home
        matches={this.state.matches}
        user={this.state.user}
        claimTicket={this.claimTicket}
      />
    )
  }
}
export default App;
