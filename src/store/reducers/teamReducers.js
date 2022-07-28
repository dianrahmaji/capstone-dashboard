import {
  FETCH_TEAM_FAIL,
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS,
  CREATE_TEAM_FAIL,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  UPDATE_TEAM_REQUEST,
  UPDATE_TEAM_SUCCESS,
  UPDATE_TEAM_FAIL,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAIL
} from '../constants/teamConstants'

export const createTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TEAM_REQUEST:
      return { loading: true }
    case CREATE_TEAM_SUCCESS:
      return { loading: false, team: action.payload }
    case CREATE_TEAM_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TEAM_REQUEST:
      return { loading: true }
    case UPDATE_TEAM_SUCCESS:
      return { loading: false, team: action.payload }
    case UPDATE_TEAM_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteTeamReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TEAM_REQUEST:
      return { loading: true }
    case DELETE_TEAM_SUCCESS:
      return { loading: false, team: action.payload }
    case DELETE_TEAM_FAIL:
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
