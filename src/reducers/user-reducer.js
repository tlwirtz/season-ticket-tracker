import * as types from '../actions/user-actions'

export default (state={}, action) => {
  switch(action.type) {
    case types.USER_LOGIN_REQUEST_SUCCESS:
      return { ...state, user: action.payload.user, credential: action.payload.credential }
    case types.USER_LOGOUT_REQUEST_SUCCESS:
      return { }
    case types.USER_LOGIN_REQUEST:
    case types.USER_LOGOUT_REQUEST:
    default:
      return state;
  }
}
