import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userReducer } from './reducers/userReducers'
import {
  teamsReducer,
  acceptedTeamsReducer,
  selectedTeamIdReducer
} from './reducers/teamReducers'

const reducer = combineReducers({
  user: userReducer,
  teams: teamsReducer,
  acceptedTeams: acceptedTeamsReducer,
  selectedTeamId: selectedTeamIdReducer
})

const userFromStorage = localStorage.getItem('user-researcher')
  ? { data: JSON.parse(localStorage.getItem('user-researcher')) }
  : { data: null }

const selectedTeamIdFromStorage = localStorage.getItem('selected-team-id') || ''

const initialState = {
  user: userFromStorage,
  selectedTeamId: selectedTeamIdFromStorage
}

const middlewares = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
)

export default store
