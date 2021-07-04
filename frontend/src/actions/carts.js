import axios from "axios";
import { ADD_TOCART_ITEM, REMOVE_FROMCART_ITEM } from "../types";
import Cookie from "js-cookie";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: ADD_TOCART_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        slug: data.slug,
        qty,
      },
    });

    Cookie.set("cartItems", JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_FROMCART_ITEM, payload: id });
  Cookie.set("cartItems", JSON.stringify(getState().cart.cartItems));
};
