import axios from 'axios'

import {
  FETCH_TEAM_FAIL,
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS
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
