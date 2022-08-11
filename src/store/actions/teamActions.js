import axios from 'axios'

import {
  CREATE_TEAM,
  DELETE_TEAM,
  EDIT_TEAM,
  ERROR_ACCEPTED_TEAM,
  ERROR_TEAM,
  FETCH_ACCEPTED_TEAM,
  FETCH_TEAM,
  LOADING_ACCEPTED_TEAM,
  LOADING_TEAM,
  SELECT_ACCEPTED_TEAM
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

    dispatch({
      type: CREATE_TEAM,
      payload: { ...payload, _id: data._id, status: 'pending' }
    })
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
    await axios.delete(`/api/team/${id}`)
    console.log(id)

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

export const fetchAcceptedTeams = id => async dispatch => {
  try {
    dispatch({ type: LOADING_ACCEPTED_TEAM })

    const { data } = await axios.get(`/api/user/${id}/team?accepted=true`)

    //TODO: Fetch only the id and name
    const teams = data.map(({ _id, name }) => ({ _id, name }))

    if (!localStorage.getItem('selected-team')) {
      localStorage.setItem('selected-team', JSON.stringify(teams[0]))
    }
    dispatch({ type: FETCH_ACCEPTED_TEAM, payload: teams })
  } catch (error) {
    dispatch({
      type: ERROR_ACCEPTED_TEAM,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const selectTeam = team => dispatch => {
  localStorage.setItem('selected-team', JSON.stringify(team))
  dispatch({ type: SELECT_ACCEPTED_TEAM, payload: team })
}
