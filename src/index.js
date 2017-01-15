import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './components/App';
import MatchDetail from './components/MatchDetail'
import configureStore from './store/configure-store'
import './styles/index.css';

const store = configureStore()

const Root = () => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/matches/:matchId" component={MatchDetail} />
      </Router>
    </Provider>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
