import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducers, productByIDReducers } from "./reducers/products";
import { cartReducers } from "./reducers/carts";
import Cookie from "js-cookie";
const reducer = combineReducers({
  productsList: productListReducers,
  productById: productByIDReducers,
  cart: cartReducers,
});

const cartItemsFromStorage = Cookie.get("cartItems")
  ? JSON.parse(Cookie.get("cartItems"))
  : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
