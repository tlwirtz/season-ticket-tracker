const localStorageMock = {
  getItem: jest.fn((item) => {
    if (item === 'user') return JSON.stringify({ user: {id: 'taylor' } });
    return null;
  }),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock;
