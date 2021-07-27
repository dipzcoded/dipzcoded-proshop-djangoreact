import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getProducts } from "../actions/products";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  PRODUCT_ADMIN_LIST_RESET,
  PRODUCT_ADMIN_LIST_DELETE_RESET,
} from "../types";
import { adminDeleteProductById } from "../actions/products";

function AdminProductListScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { products, isLoading, error } = useSelector(
    (state) => state.productAdminList
  );
  const { userData } = useSelector((state) => state.userLogin);
  const { success: deleteSuccess } = useSelector(
    (state) => state.productAdminListDelete
  );

  useEffect(() => {
    if (userData && !userData.isAdmin) {
      history.push("/");
    } else {
      dispatch({ type: PRODUCT_ADMIN_LIST_RESET });
      dispatch(getProducts("admin"));
    }

    if (deleteSuccess) {
      dispatch({ type: PRODUCT_ADMIN_LIST_RESET });
      dispatch({ type: PRODUCT_ADMIN_LIST_DELETE_RESET });
      dispatch(getProducts("admin"));
    }
  }, [dispatch, userData, history, deleteSuccess]);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // func
      dispatch(adminDeleteProductById(id));
    }
  };

  const onCreate = (product) => {
    // create product
    console.log(product);
  };
  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
      </Row>
      {isLoading && <Loader />}
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products
              ?.sort((a, b) => a._id - b._id)
              ?.map((product) => (
                <tr key={product?._id}>
                  <td>{product?._id}</td>
                  <td>{product?.name}</td>
                  <td>${product?.price}</td>
                  <td>{product?.category}</td>
                  <td>{product?.brand}</td>
                  <td>
                    <Button
                      type="button"
                      variant="danger"
                      className="btn-sm"
                      onClick={(e) => onDelete(product?._id)}
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

export default AdminProductListScreen;
