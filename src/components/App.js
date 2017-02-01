import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectMatch } from '../actions/matches-actions'
import Home from './Home'
import NavBar from './NavBar'
import Alert from './Alert'
import '../styles/App.css'

//TODO -- NEED TO HOOK UP TO REDUX WITH CONNECT()
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        { this.props.alert ? <Alert /> : null }
        <Home
          matches={this.props.matches}
          user={this.props.user}
          onMatchClick={this.props.matchClick}
        />
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    matches: state.matches.data,
    user: state.user,
    alert: state.alert.visible
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
