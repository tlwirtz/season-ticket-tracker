import rootReducer from '../reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

const middleware = applyMiddleware(thunkMiddleware)
const enhancers = compose(
  middleware,
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)

export default (initialState) => {
  return createStore(rootReducer, initialState, enhancers)
}
