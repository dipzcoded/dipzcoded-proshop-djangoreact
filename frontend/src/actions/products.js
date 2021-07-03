import axios from "axios";
import {
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_REQUEST,
  GET_PRODUCT_BYID_FAIL,
  GET_PRODUCT_BYID_SUCCESS,
  GET_PRODUCT_BYID_REQUEST,
  GET_PRODUCT_BYID_RESET,
} from "../types";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
    const { data } = await axios.get("/api/products/");
    dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
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
