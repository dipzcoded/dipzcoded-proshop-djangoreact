import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_UPDATE_FAIL,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_RESET,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_RESET,
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

export const userRegisterReducer = (state = { userData: null }, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: payload,
        error: null,
      };

    case USER_REGISTER_FAIL:
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

export const userDetailsReducer = (state = { userData: null }, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: payload,
        error: null,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case USER_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const userDetailsUpdateReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_DETAILS_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case USER_DETAILS_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: payload,
        success: true,
        error: null,
      };

    case USER_DETAILS_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: payload,
      };

    case USER_DETAILS_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};
