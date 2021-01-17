// reducers.js
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import loading from './loading'

const createRootReducer = (history) => combineReducers({
  auth,
  loading,
  router: connectRouter(history)
})
export default createRootReducer