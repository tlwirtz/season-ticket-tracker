import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store, { history } from './store/configure-store';
import { fetchMatches } from './actions/matches-actions';
import { checkIfLoggedIn } from './actions/user-actions';
import MatchList from './components/MatchList';
import App from './components/App';
import LoginPage from './components/LoginPage';
import MatchDetail from './components/MatchDetail';
import UserProfile from './components/UserProfile';
import Admin from './components/Admin';
import About from './components/About';
import './styles/index.css';

store.dispatch(fetchMatches());
store.dispatch(checkIfLoggedIn());

const Root = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} >
          <IndexRoute component={MatchList} />
          <Route path="/login" component={LoginPage} />
          <Route path="/matches/:matchId" component={MatchDetail} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/admin" component={Admin} />
          <Route path="/about" component={About} />
        </Route>
      </Router>
    </Provider>
  );
};

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
