import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import App from './components/App';
import './styles/index.css';

const Root = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App} />
    </Router>
  )
}
ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
