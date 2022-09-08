import { folderApi } from "~/api";
import {
  CREATE_FOLDER,
  ERROR_FOLDER,
  FETCH_FOLDER,
  LOADING_FOLDER,
  SET_ACTIVE_FOLDER_ID,
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

export const setActiveFolderId = (payload) => async (dispatch) => {
  dispatch({ type: SET_ACTIVE_FOLDER_ID, payload });
};
