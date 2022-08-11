import axios from 'axios'

import {
  CREATE_TEAM,
  DELETE_TEAM,
  EDIT_TEAM,
  ERROR_TEAM,
  FETCH_TEAM,
  LOADING_TEAM
} from '../constants/teamConstants'

export const fetchTeams = id => async dispatch => {
  try {
    dispatch({ type: LOADING_TEAM })

    const { data } = await axios.get(`/api/user/${id}/team`)

    dispatch({ type: FETCH_TEAM, payload: data })
  } catch (error) {
    dispatch({
      type: ERROR_TEAM,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const createTeam = payload => async dispatch => {
  try {
    const { data } = await axios.post(`/api/team`, payload)

    dispatch({ type: CREATE_TEAM, payload })
  } catch (error) {
    dispatch({
      type: ERROR_TEAM,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const updateTeam = payload => async dispatch => {
  try {
    const { data } = await axios.put(`/api/team/${payload._id}`, payload)

    dispatch({ type: EDIT_TEAM, payload })
  } catch (error) {
    dispatch({
      type: ERROR_TEAM,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const deleteTeam = id => async dispatch => {
  try {
    let { data } = await axios.delete(`/api/team/${id}`)

    dispatch({ type: DELETE_TEAM, payload: id })
  } catch (error) {
    dispatch({
      type: ERROR_TEAM,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
