import base from '../base'

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

export const updateMatchReq = (matchId, payload) => {
  return (dispatch) => {
    dispatch(updateMatch())
    return base.update(`matches/${matchId}`, {
      data: payload
    })
    .then(() => dispatch(updateMatchSuccess(matchId, payload)))
    .catch((err) => dispatch(updateMatchFailure(err)))
  }
}
