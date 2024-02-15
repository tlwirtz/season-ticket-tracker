import * as types from '../actions/matches-actions';
import { produce } from 'immer'

//todo -- udpate with immer
const updateKey = (state, payload) => {
  const newState = Object.assign({}, state);
  Object.keys(payload).forEach(key => {
    newState[key] = payload[key];
  });

  return newState;
};

const updateMatch = (state, matchId, payload) => {
  const nextState = produce(state, (draft) => {
    draft.data[matchId] = { ...draft.data[matchId], ...payload }
  })

  return nextState
};

export default (state = {}, action) => {
  switch (action.type) {
    case types.ADD_MATCHES:
    case types.ADD_MATCHES_SUCCESS:
    case types.ADD_MATCHES_FAILURE:
    case types.MATCH_SELECTED:
      return updateKey(state, action.payload);
    case types.UPDATE_MATCH:
      return state;
    case types.UPDATE_MATCH_SUCCESS:
    case types.UPDATE_MATCH_FAILURE:
      return updateMatch(state, action.matchId, action.payload);
    default:
      return state;
  }
};
