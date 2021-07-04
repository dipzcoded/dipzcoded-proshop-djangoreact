import { ADD_TOCART_ITEM, REMOVE_FROMCART_ITEM, CLEAR_SUCCESS } from "../types";

export const cartReducers = (state = { cartItems: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TOCART_ITEM:
      const item = payload;
      const existItem = state.cartItems.find(
        (el) => el.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          success: true,
          cartItems: state.cartItems.map((el) =>
            el.product === existItem.product ? item : el
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [item, ...state.cartItems],
          success: true,
        };
      }

    case REMOVE_FROMCART_ITEM:
      return {
        ...state,
        success: true,
        cartItems: state.cartItems.filter((el) => el.product !== payload),
      };

    case CLEAR_SUCCESS:
      return {
        ...state,
        success: false,
      };

    default:
      return state;
  }
};
