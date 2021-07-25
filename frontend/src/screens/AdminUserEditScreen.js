import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/users";
import { USER_DETAILS_RESET, USER_ADMIN_LIST_UPDATE_RESET } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { adminUpdateUserById } from "../actions/users";
import FormContainer from "../components/FormContainer";

function AdminUserEditScreen() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    userData: userInfo,
  } = useSelector((state) => state.userDetails);
  const { userData } = useSelector((state) => state.userLogin);
  const {
    success: updateSuccess,
    isLoading: updateLoading,
    error: updateError,
  } = useSelector((state) => state.userAdminListUpdate);
  const userId = location.pathname.split("/")[3];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, name, isAdmin } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(adminUpdateUserById(userId, { name, email, isAdmin }));
  };

  useEffect(() => {
    if (!userInfo || !userInfo?.name || updateSuccess) {
      dispatch({ type: USER_ADMIN_LIST_UPDATE_RESET });
      dispatch({ type: USER_DETAILS_RESET });
      dispatch(getUserDetails(userId));
    } else {
      setFormData({
        ...formData,
        name: userInfo?.name,
        email: userInfo?.email,
        isAdmin: userInfo?.isAdmin,
      });
    }

    if (updateSuccess) {
      history.push("/admin/userlist");
    }
  }, [dispatch, userInfo, userData, userId, updateSuccess, history]);

  return (
    <>
      <Link to="/admin/userlist">Go Back</Link>

      <FormContainer>
        <h1>Edit User</h1>
        {isLoading && <Loader />}
        {updateLoading && <Loader />}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) =>
                  setFormData({ ...formData, isAdmin: e.target.checked })
                }
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default AdminUserEditScreen;
