jest.mock('../../base');

import base from '../../base';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../matches-actions';

const mapActions = (act) => act.type;
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('selectMatch', () => {
  it('returns MATCH_SELECTED', () => {
    const expected = {
      type: actions.MATCH_SELECTED,
      payload: {
        selectedMatch: 'one'
      }
    };

    expect(actions.selectMatch('one')).toEqual(expected);
  });
});

describe('addMatches', () => {
  it('returns ADD_MATCHES', () => {
    const expected = {
      type: actions.ADD_MATCHES,
      payload: {
        isFetching: true
      }
    };

    expect(actions.addMatches()).toEqual(expected);
  });
});

describe('addMatchesSuccess', () => {
  it('returns ADD_MATCHES_SUCCESS', () => {
    const expected = {
      type: actions.ADD_MATCHES_SUCCESS,
      payload: {
        isFetching: false,
        data: { matches: 'test'}
      }
    };

    expect(actions.addMatchesSuccess({ matches: 'test' })).toEqual(expected);
  });
});

describe('addMatchesFailure', () => {
  it('returns ADD_MATCHES_FAILURE', () => {
    const expected = {
      type: actions.ADD_MATCHES_FAILURE,
      payload: {
        isFetching: false,
        err: { msg: 'test' }
      }
    };

    expect(actions.addMatchesFailure({msg: 'test'})).toEqual(expected);
  });
});

describe('updateMatch', () => {
  it('returns UPDATE_MATCH', () => {
    const expected = {
      type: actions.UPDATE_MATCH,
      matchId: 'test',
      payload: {}
    };

    expect(actions.updateMatch('test')).toEqual(expected);
  });
});

describe('updateMatchSuccess', () => {
  it('returns UPDATE_MATCH_SUCCESS', () => {
    const expected = {
      type: actions.UPDATE_MATCH_SUCCESS,
      matchId: 'test',
      payload: { matches: 'test' }
    };

    expect(actions.updateMatchSuccess('test', {matches: 'test'})).toEqual(expected);
  });
});

describe('updateMatchFailure', () => {
  it('returns UPDATE_MATCH_FAILURE', () => {
    const expected = {
      type: actions.UPDATE_MATCH_FAILURE,
      matchId: 'test',
      payload: { err: { msg: 'test err' } }
    };

    expect(actions.updateMatchFailure('test', {msg: 'test err' })).toEqual(expected);
  });
});

describe('fetchMatches', () => {
  it('dispatches correct actions on success', () => {
    const store = mockStore({});
    const expected = [
      actions.ADD_MATCHES,
      actions.ADD_MATCHES_SUCCESS
    ];

    return store.dispatch(actions.fetchMatches())
    .then(() => store.getActions().map(mapActions))
    .then(actions => expect(actions).toEqual(expected));
  });
});

describe('updateMatchReq', () => {
  it('dispatches correct actions on success', () => {
    const store = mockStore({});
    const expected = [
      actions.UPDATE_MATCH,
      actions.UPDATE_MATCH_SUCCESS,
      'SHOW_ALERT',
      actions.UPDATE_MATCH_SUCCESS
    ];

    return store.dispatch(actions.updateMatchReq('test', {available: true}, 'testcode'))
    .then(() => store.getActions().map(mapActions))
    .then(actions => expect(actions).toEqual(expected));

  });

  it('dispatches correct actions on failure', () => {
    const store = mockStore({});
    const expected = [
      actions.UPDATE_MATCH,
      'SHOW_ALERT',
      actions.UPDATE_MATCH_FAILURE
    ];

    return store.dispatch(actions.updateMatchReq('test', {available: true}, 'fakecode'))
    .then(() => store.getActions().map(mapActions))
    .then(actions => expect(actions).toEqual(expected));
  });
});
