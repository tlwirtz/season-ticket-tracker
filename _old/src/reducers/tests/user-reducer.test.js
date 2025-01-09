import { describe, it, expect } from 'vitest'
import * as types from '../../actions/user-actions';
import reducer from '../user-reducer';

describe('reducer', () => {
  it('should handle USER_LOGIN_REQUEST_SUCCESS', () => {
    const state = {};
    const payload = {
      user: 'test-user',
      credential: 'test-cred'
    };

    const action = {
      type: types.USER_LOGIN_REQUEST_SUCCESS,
      payload
    };

    expect(reducer(state, action)).toEqual(payload);
  });

  it('should handle USER_LOGOUT_REQUEST_SUCCESS', () => {
    const state = {};
    const action = { type: types.USER_LOGOUT_REQUEST_SUCCESS };

    expect(reducer(state, action)).toEqual(state);
  });

  it('should handle USER_LOGIN_REQUEST', () => {
    const state = {};
    const action = { type: types.USER_LOGIN_REQUEST };

    expect(reducer(state, action)).toEqual(state);
  });

  it('should handle USER_LOGOUT_REQUEST', () => {
    const state = { user: 'test', credential: 'hell-cred' };
    const action = { type: types.USER_LOGOUT_REQUEST };
    const expectedState = { user: null, credential: null };

    expect(reducer(state, action)).toEqual(expectedState);
  });
});
