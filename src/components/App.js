import { connect } from 'react-redux';
import React, { Component, PropTypes as T } from 'react';
import NavBar from './NavBar';
import Alert from './Alert';
import Footer from './Footer';
import SeasonDelay from './SeasonDelay';

import '../styles/App.css';

export class App extends Component {
  renderContent = () => {
    if (this.props.seasonStatus.isFetching) {
      return null;
    }

    if (this.props.seasonStatus.data.isSeasonDelayed) {
      return <SeasonDelay />;
    }

    return this.props.children;
  };

  render() {
    return (
      <div>
        <NavBar />
        {this.props.alert ? <Alert /> : null}
        {this.renderContent()}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  alert: T.bool,
  children: T.element,
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert.visible,
    seasonStatus: state.seasonStatus,
  };
};

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
