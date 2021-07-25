import axios from "axios";
import {
  USER_LOGOUT,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_FAIL,
  USER_DETAILS_RESET,
  ORDER_MY_LIST_RESET,
  USER_ADMIN_LIST_RESET,
  USER_ADMIN_LIST_FAIL,
  USER_ADMIN_LIST_SUCCESS,
  USER_ADMIN_LIST_REQUEST,
  USER_ADMIN_LIST_DELETE_SUCCESS,
  USER_ADMIN_LIST_DELETE_REQUEST,
  USER_ADMIN_LIST_DELETE_FAIL,
  USER_ADMIN_LIST_UPDATE_FAIL,
  USER_ADMIN_LIST_UPDATE_SUCCESS,
  USER_ADMIN_LIST_UPDATE_REQUEST,
} from "../types";
import Cookie from "js-cookie";

export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({
      username: formData.email,
      password: formData.password,
    });
    const { data } = await axios.post("/api/users/login/", body, config);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    Cookie.set("userData", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const registerUser =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({
        name,
        email,
        password,
      });

      const { data } = await axios.post("/api/users/register/", body, config);
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      Cookie.set("userData", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getUserDetails = (id) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userData;

  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}/`, config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUserDetails =
  ({ name, email, password }, id) =>
  async (dispatch, getState) => {
    const { token } = getState().userLogin.userData;

    try {
      dispatch({ type: USER_DETAILS_UPDATE_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const body = JSON.stringify({ name, email, password });
      const { data } = await axios.patch(`/api/users/${id}/`, body, config);
      dispatch({ type: USER_DETAILS_UPDATE_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      Cookie.set("userData", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_DETAILS_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminGetAllUsers = () => async (dispatch, getState) => {
  const { token } = getState().userLogin.userData;
  try {
    dispatch({ type: USER_ADMIN_LIST_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/users/", config);
    dispatch({ type: USER_ADMIN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_ADMIN_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminDeleteUserById = (id) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userData;
  try {
    dispatch({ type: USER_ADMIN_LIST_DELETE_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`/api/users/delete/${id}/`, config);
    dispatch({ type: USER_ADMIN_LIST_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_ADMIN_LIST_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminUpdateUserById =
  (id, formData) => async (dispatch, getState) => {
    const { token } = getState().userLogin.userData;
    try {
      dispatch({ type: USER_ADMIN_LIST_UPDATE_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const body = JSON.stringify(formData);

      await axios.patch(`/api/users/update/${id}/`, body, config);
      dispatch({ type: USER_ADMIN_LIST_UPDATE_SUCCESS });
    } catch (error) {
      dispatch({
        type: USER_ADMIN_LIST_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_MY_LIST_RESET });
  dispatch({ type: USER_ADMIN_LIST_RESET });
  Cookie.remove("userData");
};
