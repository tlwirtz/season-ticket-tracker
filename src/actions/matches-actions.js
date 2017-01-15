import base from '../base'

export const ADD_MATCHES = 'ADD_MATCHES'
export const ADD_MATCHES_SUCCESS = 'ADD_MATCHES_SUCCESS'
export const ADD_MATCHES_FAILURE = 'ADD_MATCHES_FAILURE'

export const addMatches = () => {
  return {
    type: ADD_MATCHES,
    fetchingMatches: true
  }
}

export const addMatchesSuccess = (matches) => {
  return {
    type: ADD_MATCHES_SUCCESS,
    fetchingMatches: false,
    matches
  }
}

export const addMatchesFailure = (err) => {
  return {
    type: ADD_MATCHES_FAILURE,
    fetchingMatches: false,
    err
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
