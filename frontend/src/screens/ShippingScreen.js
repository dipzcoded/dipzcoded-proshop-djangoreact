import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/carts";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { shippingAddress } = useSelector((state) => state.cart);

  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const { address, city, postalCode, country } = shippingDetails;

  useEffect(() => {
    if (shippingAddress) {
      setShippingDetails({
        address: shippingAddress?.address,
        city: shippingAddress?.city,
        postalCode: shippingAddress?.postalCode,
        country: shippingAddress?.country,
      });
    }
  }, [shippingAddress]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, postalCode, country, city }));
    setShippingDetails({
      address: "",
      city: "",
      postalCode: "",
      country: "",
    });
    history.push("/payment");
  };

  const onChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping </h1>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            name="address"
            placeholder="Enter Address"
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            name="city"
            placeholder="Enter City"
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            value={postalCode}
            name="postalCode"
            placeholder="Enter Postal Code"
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            value={country}
            name="country"
            placeholder="Enter Country"
            onChange={onChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
