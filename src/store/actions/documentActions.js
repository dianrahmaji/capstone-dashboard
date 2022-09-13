import { documentApi } from "~/api";
import {
  ADD_DOCUMENT,
  ERROR_DOCUMENT,
  LOADING_DOCUMENT,
} from "../constants/documentConstants";

// eslint-disable-next-line import/prefer-default-export
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
