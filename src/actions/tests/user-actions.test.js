import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../user-actions'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

jest.mock('../../base')
import base from '../../base'

base.authWithOAuthPopup = jest.fn((provider, authHandler) => {
  if (provider === 'bad-provider') return authHandler({ err: 'bad provider' })
  return authHandler(null, {user: { id: 'taylor' } })
})

jest.mock('../../store/configure-store')
import * as config from '../../store/configure-store'
config.history = { push: jest.fn() }

const mapActions = (act) => act.type

describe('user actions', () => {
  beforeEach(() => {
    localStorage.setItem.mockClear();
    config.history.push.mockClear();
  })

  describe('userLogin', () => {
    it('returns an action', () => {
      const expected = { type: actions.USER_LOGIN_REQUEST}
      expect(actions.userLogin()).toEqual(expected)
    })
  })

  describe('userLogout', () => {
    it('returns an action', () => {
      const expected = { type: actions.USER_LOGOUT_REQUEST}
      expect(actions.userLogout()).toEqual(expected)
    })
  })

  describe('userLogoutSuccess', () => {
    it('returns an action', () => {
      const expected = { type: actions.USER_LOGOUT_REQUEST_SUCCESS}
      expect(actions.userLogoutSuccess()).toEqual(expected)
    })
  })

  describe('userLoginSuccess', () => {
    it('returns an action with auth data', () => {
      const payload = {
        user: 'test user',
        credential: 'test creds'
      }

      const expected = {
        type: actions.USER_LOGIN_REQUEST_SUCCESS,
        payload
      }
      expect(actions.userLoginSuccess(payload)).toEqual(expected)
    })
  })

  describe('userLoginFailuer', () => {
    it('returns an action with error', () => {
      const expected = {
        type:  actions.USER_LOGIN_REQUEST_FAILURE,
        payload: {
          err: 'this failed'
        }
      }

      const action = actions.userLoginFailure('this failed')
      expect(action).toEqual(expected)
    })
  })

  describe('userLogoutReq', () => {
    it('logs out the user', () => {
      const store = mockStore({})
      const expected = [
        { type: actions.USER_LOGOUT_REQUEST },
        { type: actions.USER_LOGOUT_REQUEST_SUCCESS }
      ]
      store.dispatch(actions.userLogoutReq())
      expect(store.getActions()).toEqual(expected)
    })

    xit('should clear local storage', () => {})
    xit('should make a call to base.unauth', () => {})
  })

  describe('userLoginReq', () => {
    it('dispatches the success actions if okay', () => {
      const store = mockStore({})
      const expected = [
        'USER_LOGIN_REQUEST',
        'USER_LOGIN_REQUEST_SUCCESS',
      ]

      store.dispatch(actions.userLoginReq('google'))
      const dispatched = store.getActions()
      expect(dispatched.map(mapActions)).toEqual(expected)
    })

    it('dispatches the error actions if error', () => {
      const store = mockStore({})
      const expected = [
        'USER_LOGIN_REQUEST',
        'USER_LOGIN_REQUEST_FAILURE',
      ]

      store.dispatch(actions.userLoginReq('bad-provider'))
      const dispatched = store.getActions()
      expect(dispatched.map(mapActions)).toEqual(expected)
    })

    it('correctly sets localStorage if user logged in', () => {
      const store = mockStore({})
      const user = { user: { id: 'taylor' } }
      const expected = [
        ['user', JSON.stringify(user)]
      ]

      store.dispatch(actions.userLoginReq('google'))
      expect(localStorage.setItem.mock.calls).toEqual(expected)
    })

    it('does not call localStorage or history', () => {
      const store = mockStore({})

      store.dispatch(actions.userLoginReq('bad-provider'))
      expect(localStorage.setItem.mock.calls.length).toEqual(0)
      expect(config.history.push.mock.calls.length).toEqual(0)
    })

    it('correctly sets the history if user logged in', () => {
      const store = mockStore({})
      const expected = [ ['/'] ]

      store.dispatch(actions.userLoginReq('google'))
      expect(config.history.push.mock.calls).toEqual(expected)
    })
  })

  describe('userLoginLocalStorage', () => {
    xit('logs in if credentials are in LS', () => {

    })
  })

  describe('checkIfAdmin', () => {
    xit('checks if a user is an admin', () => {

    })
  })

  describe('checkifLoggedIn', () => {
    xit('checks if the user is in local storage', () => {

    })
  })
})
