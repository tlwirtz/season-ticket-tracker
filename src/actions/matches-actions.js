import base64 from 'base-64'
import base from '../base'
import  { updateAlert, generateAlertPayload } from './alert-actions'

export const ADD_MATCHES = 'ADD_MATCHES'
export const ADD_MATCHES_SUCCESS = 'ADD_MATCHES_SUCCESS'
export const ADD_MATCHES_FAILURE = 'ADD_MATCHES_FAILURE'
export const UPDATE_MATCH = 'UPDATE_MATCH'
export const UPDATE_MATCH_SUCCESS = 'UPDATE_MATCH_SUCCESS'
export const UPDATE_MATCH_FAILURE = 'UPDATE_MATCH_FAILURE'
export const MATCH_SELECTED = 'MATCH_SELECTED'

export const selectMatch = (matchId) => {
  return {
    type: MATCH_SELECTED,
    payload: {
      selectedMatch: matchId
    }
  }
}

export const addMatches = () => {
  return {
    type: ADD_MATCHES,
    payload: {
      isFetching: true
    }
  }
}

export const addMatchesSuccess = (data) => {
  return {
    type: ADD_MATCHES_SUCCESS,
    payload: {
      isFetching: false,
      data
    }
  }
}

export const addMatchesFailure = (err) => {
  return {
    type: ADD_MATCHES_FAILURE,
    payload: {
      isFetching: false,
      err
    }
  }
}

export const updateMatch = (matchId) => {
  return {
    type: UPDATE_MATCH,
    matchId,
    payload: {}
  }
}

export const updateMatchSuccess = (matchId, payload) => {
  return {
    type: UPDATE_MATCH_SUCCESS,
    matchId,
    payload
  }
}

export const updateMatchFailure = (matchId, err) => {
  return {
    type: UPDATE_MATCH_FAILURE,
    matchId,
    payload: {
      err
    }
  }
}

export const fetchMatches = () => {
  return (dispatch) => {
    dispatch(addMatches())
    return base.fetch('matches', {context: {}})
    .then((data) => dispatch(addMatchesSuccess(data)))
    .catch((err) => dispatch(addMatchesFailure(err)))
  }
}

const fetchAuthCode = () => base.fetch('auth-codes', {context: {}})
const validateAuthCode = (userCode, authCode) => base64.encode(userCode.toLowerCase()) === authCode

export const updateMatchReq = (matchId, payload, userAuthCode) => {
  return (dispatch) => {
    const defaultSuccess = generateAlertPayload('success', 'Sweet! You\'re going to this match')
    const defaultError = generateAlertPayload('error', 'Oh no! Something went wrong. Please try again')

    dispatch(updateMatch())
    
    return fetchAuthCode()
    .then(authCode => validateAuthCode(userAuthCode, authCode))
    .then(validatedCode => {
      if (validatedCode) {
        return base.update(`matches/${matchId}`, { data: payload })
      }
      return Promise.reject({custom: true, msg: 'You did not provide a valid redemption code'});
    })
    .then(() => {
      dispatch(updateAlert(defaultSuccess))
      dispatch(updateMatchSuccess(matchId, payload))
    })
    .catch(err => {
      err.custom
      ? dispatch(updateAlert(generateAlertPayload('error', err.msg)))
      : dispatch(updateAlert(defaultError))
      dispatch(updateMatchFailure(matchId, err))
    })
  }
}
