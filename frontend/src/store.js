import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducers, productByIDReducers } from "./reducers/products";
import { cartReducers } from "./reducers/carts";
import { userLoginReducer } from "./reducers/users";
import Cookie from "js-cookie";
const reducer = combineReducers({
  productsList: productListReducers,
  productById: productByIDReducers,
  cart: cartReducers,
  userLogin: userLoginReducer,
});

const cartItemsFromStorage = Cookie.get("cartItems")
  ? JSON.parse(Cookie.get("cartItems"))
  : [];

const userDataFromStorage = Cookie.get("userData")
  ? JSON.parse(Cookie.get("userData"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
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
