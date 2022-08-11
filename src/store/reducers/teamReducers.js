import {
  CREATE_TEAM,
  EDIT_TEAM,
  FETCH_TEAM,
  FETCH_ACCEPTED_TEAM,
  LOADING_TEAM,
  LOADING_ACCEPTED_TEAM,
  DELETE_TEAM,
  ERROR_TEAM,
  ERROR_ACCEPTED_TEAM,
  SELECT_ACCEPTED_TEAM
} from '../constants/teamConstants'

/**
 * Cases
 * 1. Fetch teams
 * 2. Create team
 * 3. Delete team
 * 4. Update team
 * 5. Delete team
 */
export const teamsReducer = (
  state = { loading: false, error: null, data: [] },
  action
) => {
  switch (action.type) {
    case LOADING_TEAM: {
      return { loading: true, error: null, data: state.data }
    }
    case FETCH_TEAM: {
      return { loading: false, error: null, data: action.payload }
    }
    case CREATE_TEAM: {
      return {
        loading: false,
        error: null,
        data: [...state.data, action.payload]
      }
    }
    case EDIT_TEAM: {
      const data = state.data.map(r =>
        r._id === action.payload._id ? { ...r, ...action.payload } : r
      )

      return {
        loading: false,
        error: null,
        data
      }
    }
    case DELETE_TEAM: {
      return {
        loading: false,
        error: null,
        data: state.data.filter(r => r._id !== action.payload)
      }
    }
    case ERROR_TEAM: {
      return {
        loading: false,
        error: action.payload,
        data: state.data
      }
    }
    default:
      return state
  }
}

/**
 * Cases:
 * 1. Loading accepted teams
 * 1. Fetch accepted teams
 * 2. Select accepted teams
 * 3. Error accepted teams
 */
export const acceptedTeamsReducer = (
  state = {
    loading: false,
    error: null,
    data: { selectedTeam: null, acceptedTeams: [] }
  },
  action
) => {
  switch (action.type) {
    case LOADING_ACCEPTED_TEAM: {
      return {
        loading: true,
        error: null,
        data: state.data
      }
    }
    case FETCH_ACCEPTED_TEAM: {
      return {
        loading: false,
        error: null,
        data: {
          selectedTeam: state.data.selectedTeam ?? action.payload[0]._id,
          acceptedTeams: action.payload
        }
      }
    }
    case SELECT_ACCEPTED_TEAM: {
      return {
        loading: false,
        error: null,
        data: {
          ...state.data,
          selectedTeam: action.payload
        }
      }
    }
    case ERROR_ACCEPTED_TEAM: {
      return {
        loading: false,
        error: action.payload,
        data: state.data
      }
    }
    default:
      return state
  }
}
