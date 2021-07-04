import {
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

function CartSummary({ cartItems }) {
  const history = useHistory();
  const checkOutHandler = (e) => {
    history.push("/login?redirect=shipping");
  };
  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h2>
            Subtotal ({cartItems.reduce((prev, next) => prev + next.qty, 0)})
            items
          </h2>
          $
          {cartItems
            .reduce((prev, next) => prev + next.qty * Number(next.price), 0)
            .toFixed(2)}
        </ListGroup.Item>
      </ListGroup>
      <ListGroup.Item>
        <Button
          type="button"
          className="btn-block"
          disabled={cartItems.length === 0}
          onClick={checkOutHandler}
        >
          Proceed To Checkout
        </Button>
      </ListGroup.Item>
    </Card>
  );
}

export default CartSummary;
