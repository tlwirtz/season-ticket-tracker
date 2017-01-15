import React, { Component } from 'react'
import Home from './Home'
import base from '../base'
import '../styles/App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      matches: {}
    }

    this.ref = base.syncState('matches', {
      context: this,
      state: 'matches'
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
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
