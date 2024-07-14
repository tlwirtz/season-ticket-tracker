import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom';
import store from './store/configure-store';
import { fetchMatches } from './actions/matches-actions';
import { checkIfLoggedIn } from './actions/user-actions';
import { fetchSeasonStatus } from './actions/season-status-actions';
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
store.dispatch(fetchSeasonStatus());

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route Component={App}>
            <Route path="/" Component={MatchList} />
            <Route path="login" Component={LoginPage} />
            <Route path="matches" Component={MatchList} />
            <Route path="matches/:matchId" Component={MatchDetail} />
            <Route path="profile" Component={UserProfile} />
            <Route path="admin" Component={Admin} />
            <Route path="about" Component={About} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
