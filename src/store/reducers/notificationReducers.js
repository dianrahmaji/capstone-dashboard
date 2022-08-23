/* eslint-disable import/prefer-default-export, default-param-last */
import {
  FETCH_NOTIFICATION,
  LOADING_NOTIFICATION,
  UPDATE_NOTIFICATION,
  RESET_NOTIFICATION,
  ERROR_NOTIFICATION,
} from "../constants/notificationConstants";

export const notificationReducer = (
  state = { loading: false, error: null, data: 0 },
  action,
) => {
  switch (action.type) {
    case LOADING_NOTIFICATION: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_NOTIFICATION: {
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    }
    case UPDATE_NOTIFICATION: {
      return {
        ...state,
        data: state.data + 1,
      };
    }
    case RESET_NOTIFICATION: {
      return {
        ...state,
        data: 0,
      };
    }
    case ERROR_NOTIFICATION: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
