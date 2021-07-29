import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, createProductReview } from "../actions/products";
import { PRODUCT_CREATE_REVIEW_RESET } from "../types";
import Loader from "../components/Loader";
import Message from "../components/Message";

// import products from "../products";
function ProductScreen() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const history = useHistory();
  const [qty, setQty] = useState(1);
  const [reviewData, setReviewData] = useState({
    comment: "",
    rating: 0,
  });

  const { product, isLoading, error } = useSelector(
    (state) => state.productById
  );

  const {
    success,
    isLoading: reviewLoading,
    error: errorReview,
  } = useSelector((state) => state.createProduct);
  const { userData } = useSelector((state) => state.userLogin);

  const onChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const { comment, rating } = reviewData;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, { comment, rating: Number(rating) })
    );
  };

  useEffect(() => {
    if (success) {
      setReviewData({
        rating: 0,
        comment: "",
      });
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    dispatch(getProductById(productId));
  }, [dispatch, productId, success]);

  const addToCartHandler = (e) => {
    history.push(`/cart/${product?.slug}?qty=${qty}`);
  };

  const alreadyReview = product?.reviews?.find((el) => el.user === userData.id);

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {isLoading && <Loader />}
      {!isLoading && error && <Message variant="danger">{error}</Message>}
      {!isLoading && product && !error && (
        <div>
          <Row>
            <Col md={6}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={Number(product?.rating)}
                    numReviews={Number(product?.numReviews)}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
                <ListGroup.Item>{product?.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product?.countInStock ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product?.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...new Array(product?.countInStock)].map(
                              (el, index) => (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn btn-block"
                      type="button"
                      disabled={!product?.countInStock}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* review comp */}
          <Row>
            <Col md={6}>
              <h4>Reviews</h4>
              {product?.reviews.length === 0 && (
                <Message variant="info">No Reviews</Message>
              )}
              <ListGroup variant="flush">
                {product?.reviews?.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <p>
                      <strong>{review.name}</strong>
                    </p>

                    <Rating
                      rating={review.rating}
                      numReviews={product?.numReviews}
                    />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                {!alreadyReview && (
                  <ListGroup.Item>
                    <h4>Write a review</h4>
                    {reviewLoading && <Loader />}
                    {errorReview && (
                      <Message variant="danger">{errorReview}</Message>
                    )}
                    {success && (
                      <Message variant="success">Review Submitted!</Message>
                    )}
                    {userData ? (
                      !alreadyReview && (
                        <Form onSubmit={onSubmit}>
                          <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as="select"
                              value={rating}
                              onChange={onChange}
                              name="rating"
                            >
                              <option value="">Select....</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very Good</option>
                              <option value="5">5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="comment">
                            <Form.Label>Review</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="comment"
                              value={comment}
                              row="5"
                              onChange={onChange}
                            ></Form.Control>
                          </Form.Group>

                          <Button
                            disabled={reviewLoading}
                            type="submit"
                            variant="primary"
                          >
                            Submit
                          </Button>
                        </Form>
                      )
                    ) : (
                      <Message variant="info">
                        Please{" "}
                        <Link to={`/login?redirect=/product/${productId}`}>
                          Login
                        </Link>{" "}
                        to wirte a review for this product
                      </Message>
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
