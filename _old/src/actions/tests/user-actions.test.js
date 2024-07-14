vi.mock('../../base');

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { unAuth, onAuth } from '../../base';
import { configureStore } from '@reduxjs/toolkit'
import user from '../../reducers/user-reducer';

import * as actions from '../user-actions';


// const mapActions = (act) => act.type;
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// config.history = { push: jest.fn() };

describe('user actions', () => {
  beforeEach(() => {
    // vi.resetAllMocks()
  });

  describe('userLogin', () => {
    it('returns an action', () => {
      const expected = { type: actions.USER_LOGIN_REQUEST };
      expect(actions.userLogin()).toEqual(expected);
    });
  });

  describe('userLogout', () => {
    it('returns an action', () => {
      const expected = { type: actions.USER_LOGOUT_REQUEST };
      expect(actions.userLogout()).toEqual(expected);
    });
  });

  describe('userLogoutSuccess', () => {
    it('returns an action', () => {
      const expected = { type: actions.USER_LOGOUT_REQUEST_SUCCESS };
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
        type: actions.USER_LOGIN_REQUEST_FAILURE,
        payload: {
          err: 'this failed'
        }
      };

      const action = actions.userLoginFailure({ err: 'this failed' });
      expect(action).toEqual(expected);
    });
  });

  describe('userLogoutReq', () => {
    it('logs out the user', () => {
      const store = configureStore({ reducer: user });

      store.subscribe(() => {
        console.log(JSON.stringify(store.getState()))
      })

      store.dispatch(actions.userLogoutReq());
      expect(store.getState()).toHaveProperty("user")
      expect(store.getState()).toHaveProperty("credential")
      expect(store.getState().user).toBeNull()
      expect(store.getState().credential).toBeNull()


    });

    it('should clear local storage', () => {
      const store = configureStore({ reducer: user });

      store.subscribe(() => {
        console.log(JSON.stringify(store.getState()))
      })

      const spy = vi.spyOn(Storage.prototype, "setItem")
      store.dispatch(actions.userLogoutReq());
      expect(spy).toBeCalledWith('user', null);
    });

    it('should make a call to unAuth', () => {
      const store = configureStore({ reducer: user });
      store.subscribe(() => {
        console.log(JSON.stringify(store.getState()))
      })

      store.dispatch(actions.userLogoutReq());
      expect(unAuth).toBeCalled();
    });
  });

  describe('userLoginReq', () => {
    it('dispatches the success actions if okay', () => {
      const store = configureStore({ reducer: user });

      store.subscribe(() => {
        console.log(JSON.stringify(store.getState()))
      })

      const expectedUser = { user: { id: 'taylor' }, credential: { token: "hello" } }
      const spy = vi.spyOn(Storage.prototype, "setItem")

      store.dispatch(actions.userLoginReq('google')).then(() => {
        expect(spy).toBeCalledWith('user', JSON.stringify(expectedUser));
        expect(store.getState()).toEqual(expectedUser);
      })
    });

    it('dispatches the error actions if error', () => {
      const store = configureStore({ reducer: user });

      store.subscribe(() => {
        console.log(JSON.stringify(store.getState()))
      })

      const spy = vi.spyOn(Storage.prototype, "setItem")

      store.dispatch(actions.userLoginReq('bad-provider')).then(() => {
        expect(spy).toBeCalledTimes(0)
        expect(store.getState()).toHaveProperty("err")
        expect(store.getState()).toHaveProperty("user")
        expect(store.getState()).toHaveProperty("credential")
        expect(store.getState().err).toEqual("bad provider")
        expect(store.getState().user).toBeNull()
        expect(store.getState().credential).toBeNull()
      })
    });
  });

  describe('userLoginLocalStorage', () => {
    it('calls base.onAuth when logged in', () => {
      const store = configureStore({ reducer: user });

      store.subscribe(() => {
        console.log(JSON.stringify(store.getState()))
      })

      const spy = vi.spyOn(Storage.prototype, "setItem")

      const authData = { email: 'taylor', password: 'fake' };
      store.dispatch(actions.userLoginLocalStorage(authData))

      expect(onAuth).toBeCalled();
      expect(spy).toHaveBeenCalledOnce()
      expect(store.getState()).toHaveProperty("user")
      expect(store.getState().user).toHaveProperty("credential")
      expect(store.getState().user.credential.token).toEqual("hello")
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
});
