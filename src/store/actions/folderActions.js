import { folderApi } from "~/api";
import {
  CREATE_FOLDER,
  DELETE_FOLDER,
  ERROR_FOLDER,
  FETCH_FOLDER,
  LOADING_FOLDER,
  SET_ACTIVE_FOLDER_ID,
  UPDATE_CHILD_FOLDER,
  UPDATE_PARENT_FOLDER,
} from "../constants/folderConstants";

export const fetchFolderById = (folderId) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_FOLDER });

    const { data } = await folderApi.fetchFolderById({ folderId });

    dispatch({ type: FETCH_FOLDER, payload: data });
  } catch (error) {
    dispatch({
      type: ERROR_FOLDER,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createFolder = (payload) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_FOLDER });

    const { data } = await folderApi.createFolder(payload);

    dispatch({ type: CREATE_FOLDER, payload: data });
  } catch (error) {
    dispatch({
      type: ERROR_FOLDER,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateFolder = (payload) => async (dispatch) => {
  try {
    const { folderId, type, ...rest } = payload;

    await folderApi.updateFolder({ folderId }, rest);

    if (type === "parent") {
      dispatch({
        type: UPDATE_PARENT_FOLDER,
        payload: { _id: folderId, ...rest },
      });
    } else {
      dispatch({
        type: UPDATE_CHILD_FOLDER,
        payload: { _id: folderId, ...rest },
      });
    }
  } catch (error) {
    dispatch({
      type: ERROR_FOLDER,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateFolderNote = (payload) => async (dispatch) => {
  try {
    const { folderId, ...rest } = payload;

    const { data } = await folderApi.updateFolderNote({ folderId }, rest);

    dispatch({ type: UPDATE_PARENT_FOLDER, payload: data });
  } catch (error) {
    dispatch({
      type: ERROR_FOLDER,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteFolder = (folderId) => async (dispatch) => {
  try {
    await folderApi.deleteFolder({ folderId });

    dispatch({ type: DELETE_FOLDER, payload: { folderId } });
  } catch (error) {
    dispatch({
      type: ERROR_FOLDER,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setActiveFolderId = (payload) => async (dispatch) => {
  dispatch({ type: SET_ACTIVE_FOLDER_ID, payload });
};
