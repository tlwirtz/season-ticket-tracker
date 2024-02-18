vi.mock('../../base');

import { describe, it, expect, vi } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import * as actions from '../matches-actions';
import matches from '../../reducers/matches-reducer';


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
        data: { matches: 'test' }
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

    expect(actions.addMatchesFailure({ msg: 'test' })).toEqual(expected);
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

    expect(actions.updateMatchSuccess('test', { matches: 'test' })).toEqual(expected);
  });
});

describe('updateMatchFailure', () => {
  it('returns UPDATE_MATCH_FAILURE', () => {
    const expected = {
      type: actions.UPDATE_MATCH_FAILURE,
      matchId: 'test',
      payload: { err: { msg: 'test err' } }
    };

    expect(actions.updateMatchFailure('test', { msg: 'test err' })).toEqual(expected);
  });
});

describe('fetchMatches', () => {
  it('dispatches correct actions on success', () => {
    const store = configureStore({ reducer: matches });

    store.subscribe(() => {
      console.log(JSON.stringify(store.getState()))
    })

    return store.dispatch(actions.fetchMatches())
      .then(() => expect(store.getState().data.testmatch).toBe("test"))
      .then(() => expect(store.getState().data).toHaveProperty("testmatch"))
  });
});

describe('updateMatchReq', () => {
  it('dispatches correct actions on success', () => {
    const store = configureStore({
      reducer: matches,
      preloadedState: {
        data: {},
      }
    });

    store.subscribe(() => {
      console.log(JSON.stringify(store.getState()))
    })

    return store.dispatch(actions.updateMatchReq('test', { available: false }, 'testcode'))
      .then(() => expect(store.getState()).toHaveProperty("data"))
      .then(() => expect(store.getState().data).toHaveProperty("test"))
      .then(() => expect(store.getState().data.test).toHaveProperty("available"))
      .then(() => expect(store.getState().data.test.available).toEqual(false))
  });

  it('dispatches correct actions on failure', () => {
    const store = configureStore({
      reducer: matches,
      preloadedState: {
        data: {},
      }
    });

    store.subscribe(() => {
      console.log(JSON.stringify(store.getState()))
    })

    return store.dispatch(actions.updateMatchReq('test', { available: true }, 'fakecode'))
      .then(() => expect(store.getState()).toHaveProperty("data"))
      .then(() => expect(store.getState().data).toHaveProperty("test"))
      .then(() => expect(store.getState().data.test).toHaveProperty("err"))
      .then(() => expect(JSON.parse(store.getState().data.test.err)).toHaveProperty("msg"))
    // .then(actions => expect(actions).toEqual(expected));
  });
});
