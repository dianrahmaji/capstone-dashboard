import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userReducer } from './reducers/userReducers'
import { teamsReducer, acceptedTeamsReducer } from './reducers/teamReducers'

const reducer = combineReducers({
  user: userReducer,
  teams: teamsReducer,
  acceptedTeams: acceptedTeamsReducer
})

const userFromStorage = localStorage.getItem('user-researcher')
  ? { data: JSON.parse(localStorage.getItem('user-researcher')) }
  : { data: null }

const acceptedTeamsFromStorage = localStorage.getItem('selected-team')
  ? {
      data: {
        selectedTeam: JSON.parse(localStorage.getItem('selected-team')),
        acceptedTeams: [JSON.parse(localStorage.getItem('selected-team'))]
      }
    }
  : { data: { selectedTeam: null, acceptedTeams: [] } }

const initialState = {
  user: userFromStorage,
  acceptedTeams: acceptedTeamsFromStorage
}

const middlewares = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
)

export default store
