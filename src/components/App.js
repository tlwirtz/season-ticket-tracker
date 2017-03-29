import { connect } from 'react-redux';
import React, { Component, PropTypes as T } from 'react';
import NavBar from './NavBar';
import Alert from './Alert';
import Footer from './Footer';
import '../styles/App.css';

export class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        {this.props.alert ? <Alert /> : null}
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  alert: T.bool,
  children: T.element
}

const mapStateToProps = (state) => {
  return {
    alert: state.alert.visible
  };
};

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
