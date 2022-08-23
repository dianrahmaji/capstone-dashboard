/* eslint-disable import/prefer-default-export, default-param-last */
import {
  ERROR_CHAT_ROOM,
  FETCH_CHAT_LOG,
  LOADING_CHAT_LOG,
  SET_CHAT_ROOM_ID,
  UPDATE_CHAT_LOG,
} from "../constants/chatConstants";

/**
 * Cases:
 */
export const chatReducer = (
  state = { loading: false, error: null, data: { roomId: "", log: [] } },
  action,
) => {
  switch (action.type) {
    case LOADING_CHAT_LOG: {
      return { ...state, loading: true };
    }
    case FETCH_CHAT_LOG: {
      return {
        ...state,
        error: null,
        loading: false,
        data: { ...action.payload },
      };
    }
    case UPDATE_CHAT_LOG: {
      return {
        ...state,
        error: null,
        data: { ...state.data, log: [...state.data.log, action.payload] },
      };
    }
    case SET_CHAT_ROOM_ID: {
      return {
        ...state,
        error: null,
        data: { roomId: action.payload, log: [] },
      };
    }
    case ERROR_CHAT_ROOM: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
