import { combineReducers } from 'redux'
import matches from './matches-reducer'
import user from './user-reducer'

const rootReducer = combineReducers({
  matches,
  user
})

export default rootReducer
