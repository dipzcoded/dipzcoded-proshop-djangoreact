import axios from "axios";
import {
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_REQUEST,
  GET_PRODUCT_BYID_FAIL,
  GET_PRODUCT_BYID_SUCCESS,
  GET_PRODUCT_BYID_REQUEST,
  GET_PRODUCT_BYID_RESET,
  PRODUCT_ADMIN_LIST_SUCCESS,
  PRODUCT_ADMIN_LIST_FAIL,
  PRODUCT_ADMIN_LIST_REQUEST,
  PRODUCT_ADMIN_LIST_DELETE_SUCCESS,
  PRODUCT_ADMIN_LIST_DELETE_REQUEST,
  PRODUCT_ADMIN_LIST_DELETE_FAIL,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_REQUEST,
} from "../types";

export const getProducts =
  (params = "default") =>
  async (dispatch) => {
    try {
      if (params === "default") {
        dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
        const { data } = await axios.get("/api/products/");
        dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data });
      } else {
        dispatch({ type: PRODUCT_ADMIN_LIST_REQUEST });
        const { data } = await axios.get("/api/products/");
        dispatch({ type: PRODUCT_ADMIN_LIST_SUCCESS, payload: data });
      }
    } catch (error) {
      if (params === "default") {
        dispatch({
          type: GET_ALL_PRODUCTS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        dispatch({
          type: PRODUCT_ADMIN_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };

export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_BYID_RESET });
    dispatch({ type: GET_PRODUCT_BYID_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: GET_PRODUCT_BYID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReview =
  (id, formData) => async (dispatch, getState) => {
    const { token } = getState().userLogin.userData;
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const body = JSON.stringify(formData);

      await axios.post(`/api/products/${id}/review/`, body, config);
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminDeleteProductById = (id) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userData;
  try {
    dispatch({ type: PRODUCT_ADMIN_LIST_DELETE_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`/api/products/delete/${id}/`, config);
    dispatch({ type: PRODUCT_ADMIN_LIST_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADMIN_LIST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
