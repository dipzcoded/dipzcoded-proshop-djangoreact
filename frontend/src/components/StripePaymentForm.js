import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderToPaid } from "../actions/order";
import Message from "../components/Message";
function StripePaymentForm({ orderId, totalPrice }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userLogin.userData);
  const [stripeError, setStripeError] = useState(null);
  const [backendError, setBackendError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = JSON.stringify({
      amount: Number(totalPrice) * 100,
      paymentMethodType: "card",
      currency: "usd",
      order_id: orderId,
    });
    // create payment intent on the server
    const {
      data: { clientSecret, error: bkError },
    } = await axios.post("/api/orders/create-payment-intent/", body, config);

    // confirm payment on the client
    const { error: spError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (bkError) {
      setBackendError(bkError?.message);
    }

    if (spError) {
      setStripeError(spError?.message);
    }

    console.log(`PaymentIntent ${paymentIntent?.status} ${paymentIntent?.id}`);
    if (stripe && paymentIntent?.status === "succeeded") {
      dispatch(updateOrderToPaid(orderId));
    }
  };
  return (
    <>
      {backendError && <Message variant="danger">{backendError}</Message>}
      {stripeError && <Message variant="danger">{stripeError}</Message>}
      <Form onSubmit={onSubmit}>
        <CardElement />
        <Button type="submit" variant="primary" className="btn-block my-3">
          Pay
        </Button>
      </Form>
    </>
  );
}

export default StripePaymentForm;
