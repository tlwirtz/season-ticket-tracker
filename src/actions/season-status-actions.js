import base from '../base';

export const ADD_SEASON_STATUS = 'ADD_SEASON_STATUS';
export const ADD_SEASON_STATUS_SUCCESS = 'ADD_SEASON_STATUS_SUCCESS';
export const ADD_SEASON_STATUS_FAILURE = 'ADD_SEASON_STATUS_FAILURE';

export const addSeasonStatus = () => {
  return {
    type: ADD_SEASON_STATUS,
    payload: {
      isFetching: true,
    },
  };
};

export const addSeasonStatusSuccess = (data) => {
  return {
    type: ADD_SEASON_STATUS_SUCCESS,
    payload: {
      isFetching: false,
      data,
    },
  };
};

export const addSeasonStatusFailure = (data) => {
  return {
    type: ADD_SEASON_STATUS_FAILURE,
    payload: {
      isFetching: false,
      data,
    },
  };
};

export const fetchSeasonStatus = () => {
  return (dispatch) => {
    dispatch(addSeasonStatus());
    return base
      .fetch('seasonDelay', { context: {} })
      .then((data) => dispatch(addSeasonStatusSuccess(data)))
      .catch((err) => dispatch(addSeasonStatusFailure(err)));
  };
};
