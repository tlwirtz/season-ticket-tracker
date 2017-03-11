import * as types from '../actions/alert-actions';

const updateState = (state, payload) => {
  const newState = {...state};
  Object.keys(payload).forEach(key => {
    newState[key] = payload[key];
  });
  return { ...state, ...newState };
};

export default (state = {}, action) => {
  switch(action.type) {
  case types.SHOW_ALERT:
  case types.HIDE_ALERT:
    return updateState(state, action.payload);
  default:
    return state;
  }
};
