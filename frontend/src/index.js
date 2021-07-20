import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { getPublishKey } from "./actions/order";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

(async () => {
  const key = await getPublishKey();
  const stripePromise = loadStripe(key);
  ReactDOM.render(
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>,
    document.getElementById("root")
  );
})();
