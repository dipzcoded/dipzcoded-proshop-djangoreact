import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import ProductItem from "../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/products";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useHistory } from "react-router-dom";
import Paginate from "../components/Paginate";

function HomeScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    isLoading,
    products,
    error,
    pages,
    page: productPage,
  } = useSelector((state) => state.productsList);

  const keyword =
    history.location.search && !history.location.search.includes("&")
      ? history.location.search
          .split("=")[1]
          .split(" ")
          .filter((el) => {
            if (el !== "") {
              return el;
            }
            return "";
          })
          .join(" ")
      : history.location.search.split("&")[0].split("=")[1];

  const page =
    history.location.search && history.location.search.includes("&")
      ? history.location.search.split("&")[1].split("=")[1]
      : 1;

  console.log(keyword);

  useEffect(() => {
    dispatch(getProducts("default", keyword, Number(page)));
  }, [dispatch, keyword, page]);

  return (
    <div>
      <h1>Latest Products</h1>
      {isLoading && <Loader />}
      {!isLoading && error && <Message variant="danger">{error}</Message>}
      {!isLoading && products?.length === 0 && !error && (
        <Message variant="info">No product found</Message>
      )}
      {!isLoading && products?.length !== 0 && !error && (
        <div>
          <Row>
            {products?.map((product) => (
              <ProductItem key={product._id} {...product} />
            ))}
          </Row>
          <Paginate pages={pages} page={productPage} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
