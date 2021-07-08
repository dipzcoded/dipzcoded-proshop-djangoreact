import axios from "axios";
import {
  USER_LOGOUT,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
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

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  Cookie.remove("userData");
};
