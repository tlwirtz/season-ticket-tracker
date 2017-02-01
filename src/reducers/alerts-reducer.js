import * as types from '../actions/alert-actions'

const updateState = (state, payload) => {
  cosnt newState = {...state}
  Objectkeys(payload).forEach(key => {
    newState[key] = payload[key]
  })
}

export default (state = {}, action) => {
  switch(action.type) {
    case types.SHOW_ALERT:
    case types.HIDE_ALERT:
      updateState(state, action.payload);
      break;
    default:
      return state;
      break;
  }
}
