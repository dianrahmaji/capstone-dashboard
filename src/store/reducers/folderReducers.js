/* eslint-disable default-param-last */
import {
  ADD_DOCUMENT,
  DELETE_DOCUMENT,
  ERROR_DOCUMENT,
  LOADING_DOCUMENT,
  UPDATE_DOCUMENT,
} from "../constants/documentConstants";
import {
  CREATE_FOLDER,
  DELETE_FOLDER,
  ERROR_FOLDER,
  FETCH_FOLDER,
  LOADING_FOLDER,
  SET_ACTIVE_FOLDER_ID,
  UPDATE_PARENT_FOLDER,
  UPDATE_CHILD_FOLDER,
} from "../constants/folderConstants";

export const folderReducer = (
  state = { loading: false, error: null, data: {} },
  action,
) => {
  switch (action.type) {
    /** Folder cases */
    case LOADING_FOLDER: {
      return { ...state, loading: true };
    }
    // TODO:
    case FETCH_FOLDER: {
      return { loading: false, error: null, data: action.payload };
    }
    case CREATE_FOLDER: {
      return {
        ...state,
        data: {
          ...state.data,
          folders: [...state.data.folders, action.payload],
        },
      };
    }
    case UPDATE_PARENT_FOLDER: {
      return { ...state, data: { ...state.data, ...action.payload } };
    }
    case UPDATE_CHILD_FOLDER: {
      const folders = state.data.folders.map((f) =>
        f._id === action.payload._id ? { ...f, ...action.payload } : f,
      );

      return { ...state, data: { ...state.data, folders } };
    }
    case DELETE_FOLDER: {
      const folders = state.data.folders.filter(
        (f) => f._id !== action.payload.folderId,
      );

      return { ...state, data: { ...state.data, folders } };
    }
    case ERROR_FOLDER: {
      return { ...state, loading: false, error: action.payload };
    }
    /** Document cases */
    // TODO:
    case LOADING_DOCUMENT: {
      return { ...state, loading: true };
    }
    case ADD_DOCUMENT: {
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          documents: [...state.data.documents, action.payload],
        },
      };
    }
    case UPDATE_DOCUMENT: {
      const documents = state.data.documents.map((d) =>
        d._id === action.payload._id ? { ...d, ...action.payload } : d,
      );

      return { ...state, loading: false, data: { ...state.data, documents } };
    }
    case DELETE_DOCUMENT: {
      const documents = state.data.documents.filter(
        ({ _id }) => _id !== action.payload,
      );

      return { ...state, loading: false, data: { ...state.data, documents } };
    }
    case ERROR_DOCUMENT: {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export const activeFolderIdReducer = (state = "", action) => {
  switch (action.type) {
    case SET_ACTIVE_FOLDER_ID: {
      return action.payload;
    }
    default:
      return state;
  }
};
