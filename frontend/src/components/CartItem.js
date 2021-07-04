import {
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/carts";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../actions/carts";
function CartItem({ product }) {
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <ListGroup.Item>
      <Row>
        <Col md={2}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </Col>
        <Col md={2}>${product.price}</Col>
        <Col md={3}>
          <Form.Control
            as="select"
            value={product.qty}
            onChange={(e) =>
              dispatch(addToCart(product.slug, Number(e.target.value)))
            }
          >
            {[...new Array(product?.countInStock)].map((el, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col md={1}>
          <Button
            type="button"
            variant="light"
            onClick={(e) => removeFromCartHandler(product.product)}
          >
            <i className="fas fa-trash"></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default CartItem;
