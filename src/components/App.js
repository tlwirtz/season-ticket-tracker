import React, { Component } from 'react'
import Home from './Home'
// import matches from '../fakeMatchData'
import base from '../base'
import '../styles/App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: { uid: "randomUID" },
      matches: {}
    }

    this.ref = base.syncState('matches', {
      context: this,
      state: 'matches'
    })

    this.claimTicket = this.claimTicket.bind(this)
    this.ticketAvailable = this.ticketAvailable.bind(this)
  }

  componentWillUnMount() {
    base.removeBinding(this.ref)
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
