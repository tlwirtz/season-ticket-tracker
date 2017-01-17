import React, { Component } from 'react'
import Home from './Home'
import base from '../base'
import '../styles/App.css'

//TODO -- NEED TO HOOK UP TO REDUX WITH CONNECT()
class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Home
        matches={this.props.matches}
        user={this.props.user}
        claimTicket={this.claimTicket}
      />
    )
  }
}
export default App;
