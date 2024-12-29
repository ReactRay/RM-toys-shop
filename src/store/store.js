import {
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux'
import { userReducer } from './user/user.reducer'
import { toysReducer } from './toys/toys.reducer'

const rootReducer = combineReducers({
  userModule: userReducer,
  toyModule: toysReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

//* For debugging
window.gStore = store
