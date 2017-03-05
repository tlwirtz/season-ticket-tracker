let base = jest.genMockFromModule('../base')

base.unauth = jest.fn()

base.authWithOAuthPopup = jest.fn((provider, authHandler) => {
  if (provider === 'bad-provider') return authHandler({ err: 'bad provider' })
  return authHandler(null, {user: { id: 'taylor' } })
})

base.onAuth = jest.fn((authHandler) => {
  const auth = { user: { id: 'taylor' } }
  authHandler(auth)
})

base.fetch = jest.fn((path, context) => {
  const admins = {
    user1: true,
    user2: true,
  }

  if ( path === 'admins' ) return Promise.resolve(admins)
  return Promise.resolve()
})

export default base
