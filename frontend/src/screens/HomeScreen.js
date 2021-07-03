import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import ProductItem from "../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/products";
import Loader from "../components/Loader";
import Message from "../components/Message";
function HomeScreen() {
  const dispatch = useDispatch();
  const { isLoading, products, error } = useSelector(
    (state) => state.productsList
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, getProducts]);

  return (
    <div>
      <h1>Latest Products</h1>
      {isLoading && <Loader />}
      {!isLoading && error && <Message message={error} variant="danger" />}
      {!isLoading && products?.length > 0 && !error && (
        <Row>
          {products?.map((product) => (
            <ProductItem key={product._id} {...product} />
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
