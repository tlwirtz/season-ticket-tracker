import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {
  matches: {
    data: {},
  },
  seasonStatus: {
    data: {
      isSeasonDelayed: false,
      messageText: null,
      messageHeader: null,
    },
  },
};

const middleware = applyMiddleware(thunkMiddleware);
const enhancers = compose(
  middleware,
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
);

const store = createStore(rootReducer, initialState, enhancers);
export const history = syncHistoryWithStore(browserHistory, store);
export default store;
