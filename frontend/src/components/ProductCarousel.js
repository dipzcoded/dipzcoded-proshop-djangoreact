import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Image, Carousel } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { getTopProducts } from "../actions/products";

function ProductCarousel() {
  const dispatch = useDispatch();
  const { isLoading, products, error } = useSelector(
    (state) => state.topRatedProducts
  );

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products?.map((product) => (
        <Carousel.Item key={product?._id}>
          <Link to={`/product/${product?.slug}`}>
            <Image src={product?.image} alt={product?.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h4>
                {product?.name} (${product?.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
