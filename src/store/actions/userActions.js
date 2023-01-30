import { userApi } from "~/api";
import MySwal from "~/utils/sweetalert";
import {
  ERROR_USER,
  LOADING_USER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_UPDATE,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_USER });

    const { data } = await userApi.login({ email, password });

    dispatch({ type: USER_LOGIN, payload: data });
  } catch (error) {
    dispatch({
      type: ERROR_USER,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    MySwal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
    });
  }
};

export const register =
  (
    fullName,
    email,
    userId,
    faculty,
    major,
    accountType,
    specialities,
    password,
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOADING_USER });

      const { data } = await userApi.register({
        fullName,
        email,
        userId,
        faculty,
        major,
        specialities,
        accountType,
        password,
      });

      dispatch({ type: USER_REGISTER, payload: data });
    } catch (error) {
      dispatch({
        type: ERROR_USER,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUser =
  ({ _id: id, ...rest }) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOADING_USER });
      const { data } = await userApi.updateUser({ id }, rest);

      dispatch({ type: USER_UPDATE, payload: data });
    } catch (error) {
      dispatch({
        type: ERROR_USER,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
};
