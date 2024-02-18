import base64 from 'base-64';
import { vi } from 'vitest'

export const unAuth = vi.fn(() => {
  return Promise.resolve()
});

export const authWithOAuthPopup = vi.fn((provider) => {
  if (provider === 'bad-provider') return Promise.reject({ err: 'bad provider' });
  return Promise.resolve({ user: { id: 'taylor' }, credential: { token: "hello" } })
});

export const onAuth = vi.fn((authHandler) => {
  //mimics the firebase user object
  const auth = {
    toJSON: () => ({
      user: { id: 'taylor' },
      credential: { token: "hello" }
    })
  };
  authHandler(auth);
});

export const fbUpdate = vi.fn((path, payload) => {
  if (path && payload) return Promise.resolve();
  return Promise.reject();
});

export const fetch = vi.fn((path) => {
  const admins = {
    user1: true,
    user2: true,
  };
  const matches = { 'testmatch': 'test' };
  const singleMatch = {
    id: 'test',
    qtyTicketsAvailable: 1,
    available: true
  }

  const codes = base64.encode('testcode');

  switch (path) {
    case 'admins':
      return Promise.resolve(admins);
    case 'matches':
      return Promise.resolve(matches);
    case 'matches/test':
      return Promise.resolve(singleMatch)
    case 'redemption-codes':
      return Promise.resolve(codes);
    default:
      return Promise.reject();
  }

});

