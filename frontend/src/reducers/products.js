import {
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_PRODUCT_BYID_FAIL,
  GET_PRODUCT_BYID_REQUEST,
  GET_PRODUCT_BYID_SUCCESS,
  GET_PRODUCT_BYID_RESET,
} from "../types";
export const productListReducers = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: payload,
        error: null,
      };

    case GET_ALL_PRODUCTS_FAIL:
      return {
        ...state,
        isLoading: false,
        products: [],
        error: payload,
      };

    default:
      return state;
  }
};

export const productByIDReducers = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCT_BYID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PRODUCT_BYID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: payload,
        error: null,
      };

    case GET_PRODUCT_BYID_FAIL:
      return {
        ...state,
        isLoading: false,
        product: null,
        error: payload,
      };

    case GET_PRODUCT_BYID_RESET:
      return { ...state, product: null, error: null };

    default:
      return state;
  }
};
