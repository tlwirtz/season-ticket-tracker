import * as types from '../../actions/alert-actions';
import reducer from '../alert-reducer';

describe('reducer', () => {
  it('should handle SHOW_ALERT', () => {
    const state = {};
    const payload = {
      test: 'this is a test'
    };
    const action = {
      type: types.SHOW_ALERT,
      payload
    };

    expect(reducer(state, action)).toEqual(payload);
  });

  it('should handle HIDE_ALERT', () => {
    const state = {};
    const payload = {
      test: 'this is a test'
    };
    const action = {
      type: types.HIDE_ALERT,
      payload
    };

    expect(reducer(state, action)).toEqual(payload);
  });
});
