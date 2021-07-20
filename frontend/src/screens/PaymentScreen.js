import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/carts";

function PaymentScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    console.log(paymentMethod);
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            id="paypal"
            name="paymentMethod"
            value="PayPal"
            checked={paymentMethod === "PayPal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>

          <Form.Check
            type="radio"
            label="Stripe"
            id="stripe"
            name="paymentMethod"
            value="Stripe"
            checked={paymentMethod === "Stripe"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
