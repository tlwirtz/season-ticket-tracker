import * as types from '../actions/user-actions';

export default (state = {}, action) => {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST_SUCCESS:
      return { ...state, user: action.payload.user, credential: action.payload.credential };
    case types.USER_LOGOUT_REQUEST_SUCCESS:
    case types.USER_LOGIN_REQUEST:
      return state;
    case types.USER_LOGOUT_REQUEST:
      return { ...state, user: null, credential: null };
    case types.USER_LOGIN_REQUEST_FAILURE:
      return { ...state, user: null, credential: null, err: action.payload.err }
    default:
      return state;
  }
};
