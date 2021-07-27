import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  CART_CLEAR_ITEMS,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_SUCCESS,
  ORDER_MY_LIST_REQUEST,
  ORDER_ADMIN_LIST_REQUEST,
  ORDER_ADMIN_LIST_SUCCESS,
  ORDER_ADMIN_LIST_FAIL,
  UPDATE_ORDER_TO_DELIVERED_ADMIN_REQUEST,
  UPDATE_ORDER_TO_DELIVERED_ADMIN_SUCCESS,
  UPDATE_ORDER_TO_DELIVERED_ADMIN_FAIL,
} from "../types";
import Cookie from "js-cookie";

export const createOrder = (order) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userData;

  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify(order);
    const { data } = await axios.post(`/api/orders/add/`, body, config);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CART_CLEAR_ITEMS });
    Cookie.remove("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getOrderById = (id) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userData;

  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}/`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getOrders = () => async (dispatch, getState) => {
  const { token } = getState().userLogin.userData;

  try {
    dispatch({ type: ORDER_ADMIN_LIST_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/`, config);
    dispatch({ type: ORDER_ADMIN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_ADMIN_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateOrderToPaid = (id) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userData;
  try {
    dispatch({ type: ORDER_PAY_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify({});
    await axios.patch(`/api/orders/${id}/pay/`, body, config);
    dispatch({ type: ORDER_PAY_SUCCESS });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateOrderToDelivered = (id) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userData;
  try {
    dispatch({ type: UPDATE_ORDER_TO_DELIVERED_ADMIN_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify({});
    await axios.patch(`/api/orders/${id}/deliver/`, body, config);
    dispatch({ type: UPDATE_ORDER_TO_DELIVERED_ADMIN_SUCCESS });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_TO_DELIVERED_ADMIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getPublishKey = async () => {
  const {
    data: { pubkey },
  } = await axios.get("/api/orders/get-publishkey");
  return pubkey;
};

export const getMyOrders = () => async (dispatch, getState) => {
  try {
    const { token } = getState().userLogin.userData;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: ORDER_MY_LIST_REQUEST });
    const { data } = await axios.get("/api/orders/myorders/", config);
    dispatch({ type: ORDER_MY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_MY_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
