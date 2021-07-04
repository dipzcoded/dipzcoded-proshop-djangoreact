import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { CLEAR_SUCCESS } from "../types";
import { addToCart } from "../actions/carts";
import { Row, Col, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
function CartScreen() {
  const dispatch = useDispatch();

  const { cartItems, success: cartSuccess } = useSelector(
    (state) => state.cart
  );
  const history = useHistory();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (cartSuccess) {
      dispatch({ type: CLEAR_SUCCESS });
      history.push("/cart");
    }

    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, history, cartSuccess, productId, qty]);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 && (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        )}
        {cartItems.length > 0 && (
          <ListGroup variant="flush">
            {cartItems?.map((el) => (
              <CartItem key={el.product} product={el} />
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <CartSummary cartItems={cartItems} />
      </Col>
    </Row>
  );
}

export default CartScreen;
