import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import App from './components/App';
import MatchDetail from './components/MatchDetail'
import './styles/index.css';

const Root = () => {
  return (
      <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/matches/:matchId" component={MatchDetail} />
      </Router>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
