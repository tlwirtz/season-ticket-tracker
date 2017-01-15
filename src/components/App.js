import React, { Component } from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import Home from './Home'
import About from './About'
import MatchDetail from './MatchDetail'
import matches from '../fakeMatchData'
import '../styles/App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches,
      user: { uid: "randomUID" }
    }

    this.claimTicket = this.claimTicket.bind(this)
    this.ticketAvailable = this.ticketAvailable.bind(this)
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
      <Router history={browserHistory}>
        <Route
          path="/"
          component={Home}
          matches={this.state.matches}
          user={this.state.user}
           />
        <Route
          path="about"
          component={About} />
        <Route
          path="/matches/:matchId"
          component={MatchDetail}
          matches={this.state.matches}
          user={this.state.user}
          claimTicket={this.claimTicket}
        />
      </Router>
    )
  }
}
export default App;
