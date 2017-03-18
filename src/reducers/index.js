import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import matches from './matches-reducer';
import user from './user-reducer';
import alert from './alert-reducer';

const rootReducer = combineReducers({
  matches,
  user,
  alert,
  routing: routerReducer
});

export default rootReducer;
