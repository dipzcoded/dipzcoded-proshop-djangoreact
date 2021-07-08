import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { loginUser } from "../actions/users";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
function LoginScreen() {
  const history = useHistory();
  const location = useLocation();
  const redirect = location.search ? location.search.split["="][1] : "/";
  const dispatch = useDispatch();
  const { userData, isLoading, error } = useSelector(
    (state) => state.userLogin
  );

  useEffect(() => {
    if (userData) {
      history.push(redirect);
    }
  }, [userData, history, redirect]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  const { email, password } = formData;

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            name="email"
            placeholder="Enter Email"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="password"
            placeholder="Enter Password"
            onChange={onChange}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
