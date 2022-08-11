import {
  ERROR_USER,
  LOADING_USER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER
} from '../constants/userConstants.js'

/**TODO: Try wether `loading` and `error` could be omitted
 * Cases:
 * 1. User login
 * 2. User register
 * 3. User logout
 * 4. User error
 */
export const userReducer = (
  state = { loading: false, error: null, data: {} },
  action
) => {
  switch (action.type) {
    case LOADING_USER: {
      return { loading: true, error: null, data: state.data }
    }
    case USER_REGISTER: {
      return { loading: false, error: null, data: action.payload }
    }
    case USER_LOGIN: {
      return { loading: false, rror: null, data: action.payload }
    }
    case USER_LOGOUT: {
      return { loading: false, error: null, data: {} }
    }
    case ERROR_USER: {
      return { loading: false, error: action.payload, data: state.data }
    }
    default:
      return state
  }
}
