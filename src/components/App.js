import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectMatch } from '../actions/matches-actions'
import Home from './Home'
import '../styles/App.css'

//TODO -- NEED TO HOOK UP TO REDUX WITH CONNECT()
class App extends Component {
  render() {
    return (
      <Home
        matches={this.props.matches}
        user={this.props.user}
        onMatchClick={this.props.matchClick}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    matches: state.matches.data,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    matchClick: (matchId) => {
      dispatch(selectMatch(matchId))
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer;
