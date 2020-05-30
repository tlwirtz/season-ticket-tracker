import * as types from '../actions/season-status-actions';

const updateKey = (state, payload) => {
  const newState = Object.assign({}, state);
  Object.keys(payload).forEach((key) => {
    newState[key] = payload[key];
  });

  return newState;
};

export default (state = {}, action) => {
  switch (action.type) {
    case types.ADD_SEASON_STATUS:
    case types.ADD_SEASON_STATUS_SUCCESS:
    case types.ADD_SEASON_STATUS_FAILURE:
      return updateKey(state, action.payload);
    default:
      return state;
  }
};
