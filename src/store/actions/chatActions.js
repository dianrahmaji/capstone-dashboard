import { chatApi } from "~/api";
import {
  ADD_ATTACHMENT,
  ERROR_CHAT_ROOM,
  FETCH_CHAT_LOG,
  LOADING_CHAT_LOG,
  REMOVE_ATTACHMENT,
  RESET_ATTACHMENT,
  SET_CHAT_ROOM_ID,
  UPDATE_ATTACHMENT_STATUS,
  UPDATE_CHAT_LOG,
} from "../constants/chatConstants";

export const fetchChatLog = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CHAT_LOG });

    const { data } = await chatApi.fetchMessages({ roomId });

    dispatch({ type: FETCH_CHAT_LOG, payload: { roomId, log: data } });
  } catch (error) {
    dispatch({
      type: ERROR_CHAT_ROOM,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateChatLog = (message) => async (dispatch) => {
  dispatch({ type: UPDATE_CHAT_LOG, payload: message });
};

// FIXME: is this usable?
export const setRoomId = (roomId) => (dispatch) => {
  dispatch({ type: SET_CHAT_ROOM_ID, payload: roomId });
};

export const addAttachment = (files) => (dispatch) => {
  dispatch({ type: ADD_ATTACHMENT, payload: files });
};

export const removeAttachment = (index) => (dispatch) => {
  dispatch({ type: REMOVE_ATTACHMENT, payload: index });
};

export const resetAttachment = () => (dispatch) => {
  dispatch({ type: RESET_ATTACHMENT });
};

export const updateAttachmentStatus = (payload) => (dispatch) => {
  dispatch({ type: UPDATE_ATTACHMENT_STATUS, payload });
};
