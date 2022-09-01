/* eslint-disable import/prefer-default-export, default-param-last */
import {
  CREATE_FOLDER,
  DELETE_FOLDER,
  ERROR_FOLDER,
  FETCH_FOLDER,
  LOADING_FOLDER,
  UPDATE_FOLDER,
} from "../constants/folderConstants";

export const folderReducer = (
  state = { loading: false, error: null, data: {} },
  action,
) => {
  switch (action.type) {
    case LOADING_FOLDER: {
      return { ...state, loading: true };
    }
    // TODO:
    case FETCH_FOLDER: {
      return { loading: false, error: null, data: action.payload };
    }
    // TODO:
    case CREATE_FOLDER: {
      return { ...state, data: { ...state.data, ...action.payload } };
    }
    // TODO:
    case UPDATE_FOLDER: {
      return { ...state, data: action.payload };
    }
    // TODO:
    case DELETE_FOLDER: {
      return { ...state, data: action.payload };
    }
    case ERROR_FOLDER: {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
