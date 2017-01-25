import React from 'react';
import { Router, Route } from 'react-router'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './components/App';
import LoginPage from './components/LoginPage'
import MatchDetail from './components/MatchDetail'
import store, { history } from './store/configure-store'
import { fetchMatches } from './actions/matches-actions'
import { checkIfLoggedIn } from './actions/user-actions'
import './styles/index.css';

store.dispatch(fetchMatches())
store.dispatch(checkIfLoggedIn())

const Root = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} />
        <Route path="/login" component={LoginPage} />
        <Route path="/matches/:matchId" component={MatchDetail} />
      </Router>
    </Provider>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
