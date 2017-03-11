import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectMatch } from '../actions/matches-actions';
import NavBar from './NavBar';
import Alert from './Alert';
import Footer from './Footer';
import '../styles/App.css';

//TODO -- NEED TO HOOK UP TO REDUX WITH CONNECT()
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        { this.props.alert ? <Alert /> : null }
        { this.props.children }
        <Footer />
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    matches: state.matches.data,
    user: state.user,
    alert: state.alert.visible
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    matchClick: (matchId) => {
      dispatch(selectMatch(matchId));
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
