import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserDetails } from "../actions/users";
import { useDispatch, useSelector } from "react-redux";
import { USER_DETAILS_UPDATE_RESET } from "../types";

function UserProfileScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const {
    isLoading,
    userData: userInfo,
    error,
  } = useSelector((state) => state.userDetails);
  const { userData } = useSelector((state) => state.userLogin);
  const { success: updateSuccess, error: updateError } = useSelector(
    (state) => state.userDetailsUpdate
  );

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: USER_DETAILS_UPDATE_RESET });
    }

    if (!userData) {
      history.push("/login");
    } else {
      if (!userInfo || !userInfo?.name || updateSuccess) {
        dispatch(getUserDetails("profile"));
      } else {
        setUserDetails({
          ...userDetails,
          name: userInfo?.name,
          email: userInfo?.email,
        });
      }
    }
  }, [
    userData,
    history,
    dispatch,
    getUserDetails,
    userInfo,
    setUserDetails,
    updateSuccess,
  ]);

  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const { name, password, confirmPassword, email } = userDetails;

  const onSubmit = (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      setMessage("passwords do not match..try again");
    } else {
      dispatch(
        updateUserDetails(
          { id: userInfo._id, name, email, password },
          "profile/update"
        )
      );
      setMessage("");
      setUserDetails({ ...userDetails, password: "", confirmPassword: "" });
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        {isLoading && <Loader />}
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {updateError && <Message variant="danger">{updateError}</Message>}
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              name="name"
              placeholder="Enter Name"
              onChange={onChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              name="email"
              placeholder="Enter Email"
              onChange={onChange}
              required
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

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={onChange}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
}

export default UserProfileScreen;
