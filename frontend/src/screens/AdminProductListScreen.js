import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getProducts } from "../actions/products";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../components/Paginate";
import {
  PRODUCT_ADMIN_LIST_RESET,
  PRODUCT_ADMIN_LIST_DELETE_RESET,
} from "../types";
import { adminDeleteProductById } from "../actions/products";

function AdminProductListScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    products,
    isLoading,
    error,
    pages,
    page: productPage,
  } = useSelector((state) => state.productAdminList);
  const { userData } = useSelector((state) => state.userLogin);
  const { success: deleteSuccess } = useSelector(
    (state) => state.productAdminListDelete
  );

  const page =
    history.location.search && history.location.search.includes("&")
      ? history.location.search.split("&")[1].split("=")[1]
      : 1;

  useEffect(() => {
    if (userData && !userData.isAdmin) {
      history.push("/");
    } else {
      dispatch({ type: PRODUCT_ADMIN_LIST_RESET });
      dispatch(getProducts("admin", "", Number(page), 6));
    }

    if (deleteSuccess) {
      dispatch({ type: PRODUCT_ADMIN_LIST_RESET });
      dispatch({ type: PRODUCT_ADMIN_LIST_DELETE_RESET });
    }
  }, [dispatch, userData, history, deleteSuccess, page]);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // func
      dispatch(adminDeleteProductById(id));
    }
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
        <div>
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
          <Paginate pages={pages} page={productPage} isAdmin={true} />
        </div>
      )}
    </div>
  );
}

export default AdminProductListScreen;
