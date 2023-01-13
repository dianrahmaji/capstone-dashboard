import { teamApi, userApi } from "~/api";
import { SET_CHAT_ROOM_ID } from "../constants/chatConstants";
import { SET_ACTIVE_FOLDER_ID } from "../constants/folderConstants";
import {
  ADD_TEAM_MEMBER,
  CREATE_TEAM,
  DELETE_TEAM,
  DELETE_TEAM_MEMBER,
  EDIT_ACCEPTED_TEAM,
  EDIT_TEAM,
  ERROR_ACCEPTED_TEAM,
  ERROR_TEAM,
  FETCH_ACCEPTED_TEAM,
  FETCH_TEAM,
  LOADING_ACCEPTED_TEAM,
  LOADING_TEAM,
  SELECT_ACCEPTED_TEAM_ID,
} from "../constants/teamConstants";

export const fetchTeams = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_TEAM });

    const { data } = await userApi.fetchTeams({ id });

    dispatch({ type: FETCH_TEAM, payload: data });
  } catch (error) {
    dispatch({
      type: ERROR_TEAM,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTeam = (payload) => async (dispatch) => {
  try {
    const { data } = await teamApi.createTeam(payload);

    dispatch({
      type: CREATE_TEAM,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_TEAM,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTeam = (payload) => async (dispatch, getState) => {
  const prevStatus = getState().teams.data.filter(
    ({ _id }) => _id === payload._id,
  );
  const status = prevStatus === "pending" ? "pending" : "updated";

  try {
    await teamApi.updateTeam({ teamId: payload._id }, payload);

    dispatch({ type: EDIT_TEAM, payload: { ...payload, status } });
  } catch (error) {
    dispatch({
      type: ERROR_TEAM,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTeam = (teamId) => async (dispatch) => {
  try {
    await teamApi.deleteTeam({ teamId });

    dispatch({ type: DELETE_TEAM, payload: teamId });
  } catch (error) {
    dispatch({
      type: ERROR_TEAM,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchAcceptedTeams = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING_ACCEPTED_TEAM });

    const { data } = await userApi.fetchAcceptedTeams({ id });

    dispatch({ type: FETCH_ACCEPTED_TEAM, payload: data });

    if (!getState().selectedTeamId.length) {
      dispatch({ type: SELECT_ACCEPTED_TEAM_ID, payload: data[0]._id });
      dispatch({ type: SET_CHAT_ROOM_ID, payload: data[0].chat });
      dispatch({
        type: SET_ACTIVE_FOLDER_ID,
        payload: data[0].repository.root,
      });
    }
  } catch (error) {
    dispatch({
      type: ERROR_ACCEPTED_TEAM,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addTeamMember = (payload) => async (dispatch) => {
  try {
    const { teamId, researcher, role } = payload;
    const isAdmin = role === "administrator";

    await teamApi.addTeamMember({ teamId, researcherId: researcher._id, role });

    dispatch({
      type: ADD_TEAM_MEMBER,
      payload: {
        teamId,
        researcher: { ...researcher, isAdmin },
      },
    });
  } catch (error) {
    dispatch({
      type: ERROR_ACCEPTED_TEAM,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTeamMember = (payload) => async (dispatch) => {
  try {
    const { teamId, researcher, role } = payload;
    const isAdmin = role === "administrator";

    await teamApi.updateTeamMember({
      teamId,
      researcherId: researcher._id,
      role,
    });

    dispatch({
      type: ADD_TEAM_MEMBER,
      payload: {
        teamId,
        researcher: { ...researcher, isAdmin },
      },
    });
  } catch (error) {
    dispatch({
      type: ERROR_ACCEPTED_TEAM,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTeamMember =
  ({ teamId, userId }) =>
  async (dispatch) => {
    try {
      await teamApi.deleteTeamMember({ teamId, userId });

      dispatch({ type: DELETE_TEAM_MEMBER, payload: { userId, teamId } });
    } catch (error) {
      dispatch({
        type: ERROR_ACCEPTED_TEAM,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// FIXME: Data Update Error
export const updateAcceptedTeam = (payload) => async (dispatch) => {
  try {
    await teamApi.updateAcceptedTeam({ teamId: payload._id }, payload);

    dispatch({ type: EDIT_ACCEPTED_TEAM, payload });
  } catch (error) {
    dispatch({
      type: ERROR_ACCEPTED_TEAM,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const selectTeam = (team) => (dispatch) => {
  dispatch({ type: SELECT_ACCEPTED_TEAM_ID, payload: team._id });
  dispatch({ type: SET_CHAT_ROOM_ID, payload: team.chat });
  dispatch({ type: SET_ACTIVE_FOLDER_ID, payload: team.repository.root });
};
