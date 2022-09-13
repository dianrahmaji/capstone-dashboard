import { deleteObject, ref } from "firebase/storage";

import { documentApi } from "~/api";
import { storage } from "~/config/firebase";

import {
  ADD_DOCUMENT,
  DELETE_DOCUMENT,
  ERROR_DOCUMENT,
  LOADING_DOCUMENT,
} from "../constants/documentConstants";

export const addDocument = (payload) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_DOCUMENT });

    const { data } = await documentApi.addDocument(payload);

    dispatch({ type: ADD_DOCUMENT, payload: data });
  } catch (error) {
    dispatch({
      type: ERROR_DOCUMENT,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDocument = (payload) => async (dispatch) => {
  const { storageDir, documentId } = payload;
  try {
    const isSample = storageDir.split("/")[1] === "sample";

    if (!isSample) {
      const storageRef = ref(storage, storageDir);
      await deleteObject(storageRef);
    }

    await documentApi.deleteDocument({ documentId });

    dispatch({ type: DELETE_DOCUMENT, payload: documentId });
  } catch (error) {
    dispatch({
      type: ERROR_DOCUMENT,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
