import * as types from '../actions/user-actions'

export default (state = {}, action) => {
  switch(action.type) {
    case types.USER_LOGIN_REQUEST_SUCCESS:
      return Object.assign(state, action.payload)
    case types.USER_LOGOUT_REQUEST_SUCCESS:
      return Object.assign(state, {user: null, credential: null})
    case types.USER_LOGIN_REQUEST:
    case types.USER_LOGOUT_REQUEST:
    default:
      return state;
  }
}
