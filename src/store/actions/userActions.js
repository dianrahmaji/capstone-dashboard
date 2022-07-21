import axios from 'axios'
import MySwal from '~/utils/sweetalert'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS
} from '../constants/userConstants'

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const { data } = await axios.post('/api/user/login', { email, password })

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem('user-researcher', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
    MySwal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response.data.message
    })
  }
}

export const register =
  (fullName, email, userId, faculty, major, accountType, password) =>
  async dispatch => {
    dispatch({ type: USER_REGISTER_REQUEST })

    const { data } = await axios.post('/api/user', {
      fullName,
      email,
      userId,
      faculty,
      major,
      accountType,
      password
    })

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
    try {
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export const logout = () => dispatch => {
  localStorage.removeItem('user-researcher')
  dispatch({ type: USER_LOGOUT })
}
