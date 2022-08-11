import {
  CREATE_TEAM,
  EDIT_TEAM,
  FETCH_TEAM,
  LOADING_TEAM,
  DELETE_TEAM
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
        data: state.filter(r => r._id !== action.payload)
      }
    }
    default:
      return state
  }
}
