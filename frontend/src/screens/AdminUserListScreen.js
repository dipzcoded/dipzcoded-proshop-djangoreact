import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { adminGetAllUsers, adminDeleteUserById } from "../actions/users";
import { USER_ADMIN_LIST_DELETE_RESET } from "../types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function AdminUserListScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { users, isLoading, error } = useSelector(
    (state) => state.userAdminList
  );
  const { userData } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userAdminListDelete);

  useEffect(() => {
    if ((userData && userData?.isAdmin) || success) {
      dispatch({ type: USER_ADMIN_LIST_DELETE_RESET });
      dispatch(adminGetAllUsers());
    } else {
      history.push("/");
    }
  }, [dispatch, history, userData, success]);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(adminDeleteUserById(id));
    }
  };
  return (
    <div>
      <h1>Users</h1>
      {isLoading && <Loader />}
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users
              ?.sort((a, b) => a._id - b._id)
              ?.map((user) => (
                <tr key={user?._id}>
                  <td>{user?._id}</td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>
                    {user?.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-check" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user?._id}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="danger"
                      className="btn-sm"
                      onClick={(e) => onDelete(user?._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default AdminUserListScreen;
