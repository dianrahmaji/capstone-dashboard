import {
  FETCH_TEAM_FAIL,
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS,
  TEAM_PROPOSE_FAIL,
  TEAM_PROPOSE_REQUEST,
  TEAM_PROPOSE_SUCCESS
} from '../constants/teamConstants'

export const teamProposeReducer = (state = {}, action) => {
  switch (action.type) {
    case TEAM_PROPOSE_REQUEST:
      return { loading: true }
    case TEAM_PROPOSE_SUCCESS:
      return { loading: false, team: action.payload }
    case TEAM_PROPOSE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const teamListReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TEAM_REQUEST:
      return { loading: true }
    case FETCH_TEAM_SUCCESS:
      return { loading: false, teams: action.payload }
    case FETCH_TEAM_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
