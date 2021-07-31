import {
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_PRODUCT_BYID_FAIL,
  GET_PRODUCT_BYID_REQUEST,
  GET_PRODUCT_BYID_SUCCESS,
  GET_PRODUCT_BYID_RESET,
  PRODUCT_ADMIN_LIST_RESET,
  PRODUCT_ADMIN_LIST_FAIL,
  PRODUCT_ADMIN_LIST_REQUEST,
  PRODUCT_ADMIN_LIST_SUCCESS,
  PRODUCT_ADMIN_LIST_DELETE_FAIL,
  PRODUCT_ADMIN_LIST_DELETE_REQUEST,
  PRODUCT_ADMIN_LIST_DELETE_RESET,
  PRODUCT_ADMIN_LIST_DELETE_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  GET_TOP_PRODUCTS_FAIL,
  GET_TOP_PRODUCTS_REQUEST,
  GET_TOP_PRODUCTS_SUCCESS,
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
        products: payload?.products,
        page: payload?.page,
        pages: payload?.pages,
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

export const productAdminListReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_ADMIN_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PRODUCT_ADMIN_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: payload?.products,
        page: payload?.page,
        pages: payload?.pages,
        error: null,
      };

    case PRODUCT_ADMIN_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case PRODUCT_ADMIN_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const productAdminListDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_ADMIN_LIST_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PRODUCT_ADMIN_LIST_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case PRODUCT_ADMIN_LIST_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case PRODUCT_ADMIN_LIST_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const createProductReviewReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };

    case PRODUCT_CREATE_REVIEW_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case PRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};

export const getTopProductReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TOP_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_TOP_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: payload,
        error: null,
      };

    case GET_TOP_PRODUCTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};
