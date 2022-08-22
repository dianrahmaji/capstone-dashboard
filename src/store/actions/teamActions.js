import axios from "axios";
import { SET_CHAT_ROOM_ID } from "../constants/chatConstants";

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

    const { data } = await axios.get(`/api/user/${id}/team`);

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
    const { data } = await axios.post("/api/team", payload);

    dispatch({
      type: CREATE_TEAM,
      payload: { ...payload, _id: data._id, status: "pending" },
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

export const updateTeam = (payload) => async (dispatch) => {
  try {
    await axios.put(`/api/team/${payload._id}`, payload);

    dispatch({ type: EDIT_TEAM, payload });
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

export const deleteTeam = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/team/${id}`);

    dispatch({ type: DELETE_TEAM, payload: id });
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

    const { data } = await axios.get(`/api/user/${id}/team?accepted=true`);

    dispatch({ type: FETCH_ACCEPTED_TEAM, payload: data });

    if (!getState().selectedTeamId.length) {
      dispatch({ type: SELECT_ACCEPTED_TEAM_ID, payload: data[0]._id });
      dispatch({ type: SET_CHAT_ROOM_ID, payload: data[0].chat });
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

    await axios.put(
      `/api/team/${teamId}/member/${researcher._id}?role=${role}`,
    );

    dispatch({ type: ADD_TEAM_MEMBER, payload });
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
      await axios.delete(`/api/team/${teamId}/member/${userId}`);

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

export const updateAcceptedTeam = (payload) => async (dispatch) => {
  try {
    await axios.put(`/api/team/${payload._id}`, payload);

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
};
