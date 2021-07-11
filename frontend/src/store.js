import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducers, productByIDReducers } from "./reducers/products";
import { cartReducers } from "./reducers/carts";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userDetailsUpdateReducer,
} from "./reducers/users";
import { orderCreateReducer } from "./reducers/order";
import Cookie from "js-cookie";
const reducer = combineReducers({
  productsList: productListReducers,
  productById: productByIDReducers,
  cart: cartReducers,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userDetailsUpdate: userDetailsUpdateReducer,
  orderCreate: orderCreateReducer,
});

const cartItemsFromStorage = Cookie.get("cartItems")
  ? JSON.parse(Cookie.get("cartItems"))
  : [];

const shippingAddressFromStorage = Cookie.get("shippingAddress")
  ? JSON.parse(Cookie.get("shippingAddress"))
  : null;

const paymentMethodFromStorage = Cookie.get("paymentMethod")
  ? JSON.parse(Cookie.get("paymentMethod"))
  : null;

const userDataFromStorage = Cookie.get("userData")
  ? JSON.parse(Cookie.get("userData"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: {
    userData: userDataFromStorage,
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
