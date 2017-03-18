import base64 from 'base-64';
let base = jest.genMockFromModule('../base');

base.unauth = jest.fn();

base.authWithOAuthPopup = jest.fn((provider, authHandler) => {
  if (provider === 'bad-provider') return authHandler({ err: 'bad provider' });
  return authHandler(null, { user: { id: 'taylor' } });
});

base.onAuth = jest.fn((authHandler) => {
  const auth = { user: { id: 'taylor' } };
  authHandler(auth);
});

base.update = jest.fn((path, payload) => {
  if (path && payload) return Promise.resolve();
  return Promise.reject();
});

base.fetch = jest.fn((path) => {
  const admins = {
    user1: true,
    user2: true,
  };
  const matches = { 'testmatch': 'test' };
  const singleMatch = {
    'test': {
      id: 'test',
      qtyTicketsAvailable: 1
    }
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

export default base;
