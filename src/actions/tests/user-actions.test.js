import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import * as actions from '../user-actions'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

//TODO -- how to handle mocking of REBASE functionality?

describe('user actions', () => {
  describe('userLogin', () => {
    it('should return an action', () => {
      const expected = { type: actions.USER_LOGIN_REQUEST}
      expect(actions.userLogin()).toEqual(expected)
    })
  })

  describe('userLogout', () => {
    it('should return an action', () => {
      const expected = { type: actions.USER_LOGOUT_REQUEST}
      expect(actions.userLogout()).toEqual(expected)
    })
  })

  describe('userLogoutSuccess', () => {
    it('should return an action', () => {
      const expected = { type: actions.USER_LOGOUT_REQUEST_SUCCESS}
      expect(actions.userLogoutSuccess()).toEqual(expected)
    })
  })

  describe('userLoginSuccess', () => {
    it('should return an action with auth data', () => {
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
    it('should return an action with error', () => {
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
    it('should logout the user', () => {
      const store = mockStore({})
      const expected = [
        { type: actions.USER_LOGOUT_REQUEST },
        { type: actions.USER_LOGOUT_REQUEST_SUCCESS }
      ]
      store.dispatch(actions.userLogoutReq())
      expect(store.getActions()).toEqual(expected)
    })
  })

  //TODO -- try actually mocking by using nock ...
  //TODO -- figure out which calls
  describe('userLoginReq', () => {
    it('should log in a user', () => {
      const store = mockStore({})
      return store.dispatch(actions.userLoginReq('google'))
        .then(data => expect(data).toEqual(null))
    })
  })

  describe('userLoginLocalStorage', () => {
    xit('should login if credentials are in LS', () => {

    })
  })

  describe('checkIfAdmin', () => {
    xit('should check if a user is an admin', () => {

    })
  })

  describe('checkifLoggedIn', () => {
    xit('should check if the user is in local storage', () => {

    })
  })
})
