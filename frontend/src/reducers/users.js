import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../types";

export const userLoginReducer = (state = { userData: null }, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: payload,
        error: null,
      };

    case USER_LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case USER_LOGOUT:
      return {
        ...state,
        isLoading: false,
        userData: null,
        error: null,
      };

    default:
      return state;
  }
};
