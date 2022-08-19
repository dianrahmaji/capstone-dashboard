/* eslint-disable default-param-last */
import {
  ADD_TEAM_MEMBER,
  CREATE_TEAM,
  EDIT_TEAM,
  FETCH_TEAM,
  FETCH_ACCEPTED_TEAM,
  LOADING_TEAM,
  LOADING_ACCEPTED_TEAM,
  DELETE_TEAM,
  ERROR_TEAM,
  ERROR_ACCEPTED_TEAM,
  SELECT_ACCEPTED_TEAM_ID,
  EDIT_ACCEPTED_TEAM,
  DELETE_TEAM_MEMBER,
} from "../constants/teamConstants";

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
  action,
) => {
  switch (action.type) {
    case LOADING_TEAM: {
      return { loading: true, error: null, data: state.data };
    }
    case FETCH_TEAM: {
      return { loading: false, error: null, data: action.payload };
    }
    case CREATE_TEAM: {
      return {
        loading: false,
        error: null,
        data: [...state.data, action.payload],
      };
    }
    case EDIT_TEAM: {
      const data = state.data.map((r) =>
        r._id === action.payload._id ? { ...r, ...action.payload } : r,
      );

      return {
        loading: false,
        error: null,
        data,
      };
    }
    case DELETE_TEAM: {
      return {
        loading: false,
        error: null,
        data: state.data.filter((r) => r._id !== action.payload),
      };
    }
    case ERROR_TEAM: {
      return {
        loading: false,
        error: action.payload,
        data: state.data,
      };
    }
    default:
      return state;
  }
};

/**
 * Cases:
 * 1. Loading accepted teams
 * 2. Fetch accepted teams
 * 3. Edit accepted team
 * 4. Add team member
 * 5. Delete team member
 * 6. Error accepted teams
 */
export const acceptedTeamsReducer = (
  state = {
    loading: false,
    error: null,
    data: [],
  },
  action,
) => {
  switch (action.type) {
    case LOADING_ACCEPTED_TEAM: {
      return {
        loading: true,
        error: null,
        data: state.data,
      };
    }
    case FETCH_ACCEPTED_TEAM: {
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    }
    case EDIT_ACCEPTED_TEAM: {
      const { title, description, startDate, endDate, rest } = action.payload;
      const data = state.data.map((d) =>
        d._id === action.payload._id
          ? {
              ...d,
              ...rest,
              repository: {
                ...d.repository,
                title,
                description,
                startDate,
                endDate,
              },
            }
          : d,
      );

      return { loading: false, error: null, data };
    }
    case ADD_TEAM_MEMBER: {
      const data = state.data.map((d) =>
        d._id === action.payload.teamId
          ? { ...d, members: [...d.members, action.payload.researcher] }
          : d,
      );

      return { loading: false, error: null, data };
    }
    case DELETE_TEAM_MEMBER: {
      const data = state.data.map((d) =>
        d._id === action.payload.teamId
          ? {
              ...d,
              members: d.members.filter(
                ({ _id }) => _id !== action.payload.userId,
              ),
            }
          : d,
      );

      return { loading: false, error: null, data };
    }
    case ERROR_ACCEPTED_TEAM: {
      return {
        loading: false,
        error: action.payload,
        data: state.data,
      };
    }
    default:
      return state;
  }
};

/**
 *
 * Cases:
 * 1. Select accepted team
 */
export const selectedTeamIdReducer = (state = "", action) => {
  switch (action.type) {
    case SELECT_ACCEPTED_TEAM_ID: {
      return action.payload;
    }
    default:
      return state;
  }
};
