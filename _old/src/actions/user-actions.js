import { fetch, unAuth, authWithOAuthPopup, onAuth } from '../base';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_REQUEST_SUCCESS = 'USER_LOGIN_REQUEST_SUCCESS';
export const USER_LOGIN_REQUEST_FAILURE = 'USER_LOGIN_REQUEST_FAILURE';
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_REQUEST_SUCCESS = 'USER_LOGOUT_REQUEST_SUCCESS';

export const userLogin = () => {
  return {
    type: USER_LOGIN_REQUEST
  };
};

export const userLoginSuccess = (authData) => {
  const { user, credential } = authData;
  return {
    type: USER_LOGIN_REQUEST_SUCCESS,
    payload: {
      user,
      credential
    }
  };
};

export const userLoginFailure = (err) => {
  return {
    type: USER_LOGIN_REQUEST_FAILURE,
    payload: err
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT_REQUEST
  };
};

export const userLogoutSuccess = () => {
  return {
    type: USER_LOGOUT_REQUEST_SUCCESS
  };
};

export const userLogoutReq = () => {
  return (dispatch, getState) => {
    dispatch(userLogout());
    localStorage.setItem('user', null);
    return unAuth().then(() => dispatch(userLogoutSuccess()))

  };
};

export const userLoginReq = (provider) => {
  return (dispatch) => {
    dispatch(userLogin());

    return authWithOAuthPopup(provider).then(authData => {
      localStorage.setItem('user', JSON.stringify(authData));
      return dispatch(userLoginSuccess(authData));
    }).catch(err => dispatch(userLoginFailure(err)))
  };
};

export const userLoginLocalStorage = () => {
  return (dispatch) => {
    dispatch(userLogin());

    const authHandler = (user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify({ user: user.toJSON() }));
        return dispatch(userLoginSuccess({ user: user.toJSON() }));
      }

      return dispatch(userLogoutReq());
    };
    return onAuth(authHandler);
  };
};

export const checkIfLoggedIn = () => {
  return (dispatch) => {
    const auth = localStorage.getItem('user');
    if (auth) {
      dispatch(userLoginLocalStorage());
    }
  };
};

export const checkIfAdmin = (userId) => {
  return fetch('admins', { context: {} })
    .then(admins => Object.keys(admins).includes(userId))
    .catch(() => { return false; });
};
