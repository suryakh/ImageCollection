import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { userReducers, dataReducers } from './Reducers'
const reducers = combineReducers({
    userReducers,
    dataReducers
})
const store = createStore(reducers, applyMiddleware(thunk))

export default store