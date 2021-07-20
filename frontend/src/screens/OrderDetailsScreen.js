import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Card, ListGroup, Image } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderById } from "../actions/order";
import StripePaymentForm from "../components/StripePaymentForm";
import { ORDER_PAY_RESET } from "../types";

function OrderDetailsScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];

  const { order, error, isLoading } = useSelector(
    (state) => state.orderDetails
  );
  const { success: paySuccess, error: payError } = useSelector(
    (state) => state.orderPay
  );

  const itemsPrice = order?.orderItems.reduce(
    (acc, next) => acc + next.price * next.qty,
    0
  );

  useEffect(() => {
    if (!order || paySuccess) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId, order, paySuccess]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  if (payError) {
    return <Message variant="danger">{payError}</Message>;
  }

  return (
    <div>
      <h1>Order: {order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Name:</strong> {order?.user?.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${order?.user?.email}`}>
                  {order?.user?.email}
                </a>
              </p>

              <p>
                <strong>Shipping: </strong>
                {order?.shippingAddress?.address},{" "}
                {order?.shippingAddress?.city}{" "}
                {order?.shippingAddress?.postalCode},
                {order?.shippingAddress?.country}
              </p>
              {order?.isDelivered ? (
                <Message variant="success">
                  Delivered on {order?.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {order?.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems.length === 0 ? (
                <Message variant="info">No order was created</Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems?.map((item) => (
                    <ListGroup.Item key={item?.product}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item?.image}
                            alt={item?.name}
                            rounded
                            fluid
                          />
                        </Col>
                        <Col>
                          <p>{item?.name}</p>
                        </Col>
                        <Col md={4}>
                          {item?.qty} X ${item?.price} = $
                          {(item?.qty * item?.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Item:</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>

          {!order?.isPaid && (
            <Card className="my-4">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <StripePaymentForm
                    orderId={orderId}
                    totalPrice={order?.totalPrice}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default OrderDetailsScreen;
