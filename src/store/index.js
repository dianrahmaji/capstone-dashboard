import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import {
  teamListReducer,
  updateTeamReducer,
  createTeamReducer,
  deleteTeamReducer
} from './reducers/teamReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  teamList: teamListReducer,
  createTeam: createTeamReducer,
  updateTeam: updateTeamReducer,
  deleteTeam: deleteTeamReducer
})

const userFromStorage = localStorage.getItem('user-researcher')
  ? JSON.parse(localStorage.getItem('user-researcher'))
  : null

const initialState = {
  userLogin: { user: userFromStorage }
}

const middlewares = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
)

export default store
