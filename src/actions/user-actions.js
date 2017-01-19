import base from '../base'

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_REQUEST_SUCCESS = 'USER_LOGIN_REQUEST_SUCCESS'
export const USER_LOGIN_REQUEST_FAILURE = 'USER_LOGIN_REQUEST_FAILURE'
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST'
export const USER_LOGOUT_REQUEST_SUCCESS = 'USER_LOGOUT_REQUEST_SUCCESS'


export const userLogin = () => {
  return {
    type: USER_LOGIN_REQUEST
  }
}

export const userLoginSuccess = (authData) => {
  const { user, credential } = authData
  return {
    type: USER_LOGIN_REQUEST_SUCCESS,
    payload: {
      user,
      credential
    }
  }
}

export const userLoginFailure = (err) => {
  return {
    type: USER_LOGIN_REQUEST_FAILURE,
    payload: {
      err
    }
  }
}

export const userLogout = () => {
  return {
    type: USER_LOGOUT_REQUEST
  }
}

export const userLogoutSuccess = () => {
  return {
    type: USER_LOGOUT_REQUEST_SUCCESS
  }
}


export const userLoginReq = (provider) => {
  return (dispatch) => {
    dispatch(userLogin())
    const authHandler = (err, authData) => {
      if (err) {
        return dispatch(userLoginFailure(err))
      }
      return dispatch(userLoginSuccess(authData))
    }

    return base.authWithOAuthPopup(provider, authHandler)
  }
}

export const userLogoutReq = () => {
  return (dispatch, getState) => {
    dispatch(userLogout())
    base.unauth()
    dispatch(userLogoutSuccess())
  }
}
