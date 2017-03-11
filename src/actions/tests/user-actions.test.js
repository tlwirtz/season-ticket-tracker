// MOCKS
jest.mock('../../base');
jest.mock('../../store/configure-store');

import base from '../../base';
import * as config from '../../store/configure-store';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../user-actions';

const mapActions = (act) => act.type;
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

config.history = { push: jest.fn() };

describe('user actions', () => {
  beforeEach(() => {
    localStorage.setItem.mockClear();
    config.history.push.mockClear();
    base.unauth.mockClear();
    base.onAuth.mockClear();
  });

  describe('userLogin', () => {
    it('returns an action', () => {
      const expected = { type: actions.USER_LOGIN_REQUEST};
      expect(actions.userLogin()).toEqual(expected);
    });
  });

  describe('userLogout', () => {
    it('returns an action', () => {
      const expected = { type: actions.USER_LOGOUT_REQUEST};
      expect(actions.userLogout()).toEqual(expected);
    });
  });

  describe('userLogoutSuccess', () => {
    it('returns an action', () => {
      const expected = { type: actions.USER_LOGOUT_REQUEST_SUCCESS};
      expect(actions.userLogoutSuccess()).toEqual(expected);
    });
  });

  describe('userLoginSuccess', () => {
    it('returns an action with auth data', () => {
      const payload = {
        user: 'test user',
        credential: 'test creds'
      };

      const expected = {
        type: actions.USER_LOGIN_REQUEST_SUCCESS,
        payload
      };
      expect(actions.userLoginSuccess(payload)).toEqual(expected);
    });
  });

  describe('userLoginFailuer', () => {
    it('returns an action with error', () => {
      const expected = {
        type:  actions.USER_LOGIN_REQUEST_FAILURE,
        payload: {
          err: 'this failed'
        }
      };

      const action = actions.userLoginFailure('this failed');
      expect(action).toEqual(expected);
    });
  });

  describe('userLogoutReq', () => {
    it('logs out the user', () => {
      const store = mockStore({});
      const expected = [
        { type: actions.USER_LOGOUT_REQUEST },
        { type: actions.USER_LOGOUT_REQUEST_SUCCESS }
      ];
      store.dispatch(actions.userLogoutReq());
      expect(store.getActions()).toEqual(expected);
    });

    it('should clear local storage', () => {
      const store = mockStore({});
      store.dispatch(actions.userLogoutReq());

      expect(localStorage.setItem).toBeCalledWith('user', null);
    });

    it('should make a call to base.unauth', () => {
      const store = mockStore({});
      store.dispatch(actions.userLogoutReq());

      expect(base.unauth).toBeCalled();
    });
  });

  describe('userLoginReq', () => {
    it('dispatches the success actions if okay', () => {
      const store = mockStore({});
      const expected = [
        'USER_LOGIN_REQUEST',
        'USER_LOGIN_REQUEST_SUCCESS',
      ];

      store.dispatch(actions.userLoginReq('google'));
      const dispatched = store.getActions();
      expect(dispatched.map(mapActions)).toEqual(expected);
    });

    it('dispatches the error actions if error', () => {
      const store = mockStore({});
      const expected = [
        'USER_LOGIN_REQUEST',
        'USER_LOGIN_REQUEST_FAILURE',
      ];

      store.dispatch(actions.userLoginReq('bad-provider'));
      const dispatched = store.getActions();
      expect(dispatched.map(mapActions)).toEqual(expected);
    });

    it('correctly sets localStorage if user logged in', () => {
      const store = mockStore({});
      const user = { user: { id: 'taylor' } };

      store.dispatch(actions.userLoginReq('google'));
      expect(localStorage.setItem).toBeCalledWith('user', JSON.stringify(user));
    });

    it('does not call localStorage or history', () => {
      const store = mockStore({});

      store.dispatch(actions.userLoginReq('bad-provider'));
      expect(localStorage.setItem.mock.calls.length).toEqual(0);
      expect(config.history.push.mock.calls.length).toEqual(0);
    });

    it('correctly sets the history if user logged in', () => {
      const store = mockStore({});

      store.dispatch(actions.userLoginReq('google'));
      expect(config.history.push).toBeCalledWith('/');
    });
  });

  describe('userLoginLocalStorage', () => {
    it('calls base.onAuth when logged in', () => {
      const store = mockStore({});
      const authData = { email: 'taylor', password: 'fake' };
      store.dispatch(actions.userLoginLocalStorage(authData));
      expect(base.onAuth).toBeCalled();
    });

    it('dispatches the proper actions', () => {
      const store = mockStore({});
      const authData = { email: 'taylor', password: 'fake' };
      const expected = [
        actions.USER_LOGIN_REQUEST,
        actions.USER_LOGIN_REQUEST_SUCCESS
      ];

      store.dispatch(actions.userLoginLocalStorage(authData));
      const dispatched = store.getActions().map(mapActions);
      expect(dispatched).toEqual(expected);
    });

    it('adds data to local storage', () => {
      const store = mockStore({});
      const authData = { email: 'taylor', password: 'fake' };
      const user = { id: 'taylor' };

      store.dispatch(actions.userLoginLocalStorage(authData));
      expect(localStorage.setItem).toBeCalledWith('user', JSON.stringify({ user}));
    });
  });

  describe('checkIfAdmin', () => {
    it('returns true if user is an admin', () => {
      const userid = 'user1';
      return actions.checkIfAdmin(userid)
      .then((res) => expect(res).toEqual(true));
    });

    it('returns false if user is not an admin', () => {
      const userid = 'fakeuser';
      return actions.checkIfAdmin(userid)
      .then((res) => expect(res).toEqual(false));
    });
  });

  describe('checkifLoggedIn', () => {
    it('checks if the user is in local storage', () => {
      const store = mockStore({});
      const expected = [
        actions.USER_LOGIN_REQUEST,
        actions.USER_LOGIN_REQUEST_SUCCESS
      ];
      store.dispatch(actions.checkIfLoggedIn());
      const dispatched = store.getActions().map(mapActions);

      expect(localStorage.getItem).toBeCalledWith('user');
      expect(dispatched).toEqual(expected);
    });
  });
});
