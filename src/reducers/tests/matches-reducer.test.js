import * as types from '../../actions/matches-actions'
import reducer from '../matches-reducer';

describe('reducer', () => {
  it('handles ADD_MATCHES', () => {
    const state = {}
    const payload = { test: 'test payload' }
    const action = {
      type: types.ADD_MATCHES,
      payload
    }

    expect(reducer(state, action)).toEqual(payload)
  })

  it('handles ADD_MATCHES_SUCCESS', () => {
    const state = {}
    const payload = { test: 'test payload' }
    const action = {
      type: types.ADD_MATCHES_SUCCESS,
      payload
    }

    expect(reducer(state, action)).toEqual(payload)
  })

  it('handles ADD_MATCHES_FAILURE', () => {
    const state = {}
    const payload = { test: 'test payload' }
    const action = {
      type: types.ADD_MATCHES_FAILURE,
      payload
    }

    expect(reducer(state, action)).toEqual(payload)
  })

  it('handles MATCH_SELECTED', () => {
    const state = {}
    const payload = { test: 'test payload' }
    const action = {
      type: types.MATCH_SELECTED,
      payload
    }

    expect(reducer(state, action)).toEqual(payload)
  })

  it('handles UPDATE_MATCH', () => {
    const state = {}
    const action = { type: types.UPDATE_MATCH }
    expect(reducer(state, action)).toEqual(state)
  })

  it('handles UPDATE_MATCH_SUCCESS', () => {
    const payload = { test: 'test payload'}
    const state = {
      data: {
        'test-match': { id: 'test-match' }
      }
    }
    const action = {
      type: types.UPDATE_MATCH_SUCCESS,
      matchId: 'test-match',
      payload
    }

    const expectedState = {
      data: {
        'test-match': {
          id: 'test-match',
          test: payload.test
        }
      }
    }

    expect(reducer(state, action)).toEqual(expectedState)
  })

  it('handles UPDATE_MATCH_FAILURE', () => {
    const payload = { test: 'test payload'}
    const state = {
      data: {
        'test-match': { id: 'test-match' }
      }
    }
    const action = {
      type: types.UPDATE_MATCH_FAILURE,
      matchId: 'test-match',
      payload
    }

    const expectedState = {
      data: {
        'test-match': {
          id: 'test-match',
          test: payload.test
        }
      }
    }

    expect(reducer(state, action)).toEqual(expectedState)
  })
})
