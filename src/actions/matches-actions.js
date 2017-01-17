import base from '../base'

export const ADD_MATCHES = 'ADD_MATCHES'
export const ADD_MATCHES_SUCCESS = 'ADD_MATCHES_SUCCESS'
export const ADD_MATCHES_FAILURE = 'ADD_MATCHES_FAILURE'
export const UPDATE_MATCH = 'UPDATE_MATCH'
export const UPDATE_MATCH_SUCCESS = 'UPDATE_MATCH_SUCCESS'
export const UPDATE_MATCH_FAILURE = 'UPDATE_MATCH_FAILURE'

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
    payload: {
      isFetching: true
    }
  }
}

export const updateMatchSuccess = (matchId, key, value) => {
  return {
    type: UPDATE_MATCH_SUCCESS,
    matchId,
    payload: {
      [key]: value
    }
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

export const updateMatchReq = (matchId, key, payload) => {
  return (dispatch) => {
    dispatch(updateMatch(matchId))
    return base.update(`matches/${matchId}`, {
      data: { [key]: payload}
    })
    .then(() => dispatch(updateMatchSuccess(matchId, key, payload)))
    .then((err) => dispatch(updateMatchFailure(err)))
  }
}
