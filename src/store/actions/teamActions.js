import axios from 'axios'

import {
  CREATE_TEAM_FAIL,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  DELETE_TEAM_FAIL,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  FETCH_TEAM_FAIL,
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS,
  UPDATE_TEAM_FAIL,
  UPDATE_TEAM_REQUEST,
  UPDATE_TEAM_SUCCESS
} from '../constants/teamConstants'

export const teamList = id => async dispatch => {
  try {
    dispatch({ type: FETCH_TEAM_REQUEST })

    const { data } = await axios.get(`/api/user/${id}/team`)

    dispatch({ type: FETCH_TEAM_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_TEAM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const createTeam = payload => async dispatch => {
  try {
    dispatch({ type: CREATE_TEAM_REQUEST })

    const { data } = await axios.post(`/api/team`, payload)

    dispatch({ type: CREATE_TEAM_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CREATE_TEAM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const updateTeam = payload => async dispatch => {
  try {
    dispatch({ type: UPDATE_TEAM_REQUEST })

    const { data } = await axios.put(`/api/team/${payload._id}`, payload)

    dispatch({ type: UPDATE_TEAM_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: UPDATE_TEAM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const deleteTeam = id => async dispatch => {
  try {
    dispatch({ type: DELETE_TEAM_REQUEST })

    let { data } = await axios.delete(`/api/team/${id}`)

    dispatch({ type: DELETE_TEAM_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DELETE_TEAM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
