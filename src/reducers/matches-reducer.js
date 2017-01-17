import * as types from '../actions/matches-actions'

const updateKey = (state, payload) => {
  const newState = Object.assign({}, state)
  console.log('updating state', newState, payload)
  Object.keys(payload).forEach(key => {
    newState[key] = payload[key]
  })

  return newState
}

export default (state = {}, action) => {
  switch(action.type) {
    case types.ADD_MATCHES, types.ADD_MATCHES_SUCCESS,
    types.ADD_MATCHES_FAILURE:
      return updateKey(state, action.payload)
      break;
    case types.UPDATE_MATCH,
    types.UPDATE_MATCH_SUCCESS,
    types.UPDATE_MATCH_FAILURE:
      return updateKey(state[action.matchId], action.payload)
      break;
    default:
      return state;
  }
}
