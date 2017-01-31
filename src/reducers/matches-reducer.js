import * as types from '../actions/matches-actions'

const updateKey = (state, payload) => {
  const newState = Object.assign({}, state)
  Object.keys(payload).forEach(key => {
    newState[key] = payload[key]
  })

  return newState
}

const updateMatch = (state, matchId, payload) => {
  const { data } = state
  Object.keys(payload).forEach(key => {
    data[matchId] = Object.assign({}, data[matchId], payload)
  })

  return Object.assign({}, state, { data })
}

export default (state = {}, action) => {
  switch(action.type) {
    case types.ADD_MATCHES:
    case types.ADD_MATCHES_SUCCESS:
    case types.ADD_MATCHES_FAILURE:
    case types.MATCH_SELECTED:
      return updateKey(state, action.payload)
      break;
    case types.UPDATE_MATCH:
      return state;
      break;
    case types.UPDATE_MATCH_SUCCESS:
    case types.UPDATE_MATCH_FAILURE:
      return updateMatch(state, action.matchId, action.payload)
      break;
    default:
      return state;
  }
}
