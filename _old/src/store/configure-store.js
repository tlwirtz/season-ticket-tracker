import { configureStore } from '@reduxjs/toolkit'
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

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
})

export default store;
