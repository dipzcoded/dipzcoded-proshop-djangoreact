import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_MY_LIST_RESET,
} from "../types";

export const orderCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        order: payload,
      };

    case ORDER_CREATE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        order: payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_PAY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case ORDER_PAY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
        success: false,
      };

    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const getMyOrdersReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_MY_LIST_REQUEST:
      return {
        ...state,
        isLoading: false,
      };

    case ORDER_MY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: payload,
        error: null,
      };

    case ORDER_MY_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case ORDER_MY_LIST_RESET:
      return {
        ...state,
        orders: null,
      };

    default:
      return state;
  }
};
