import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { userReducers } from './Reducers'
const reducers = combineReducers({
    userReducers
})
const store = createStore(reducers, applyMiddleware(thunk))

export default store