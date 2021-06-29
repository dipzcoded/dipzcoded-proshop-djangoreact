import { Col, Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
function ProductItem({
  _id,
  name,
  image,
  description,
  brand,
  category,
  price,
  countInStock,
  rating,
  numReviews,
}) {
  return (
    <Col sm={12} md={6} lg={4} xl={3}>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${_id}`}>
          <Card.Img src={image} />
        </Link>
        <Card.Body>
          <Link to={`/product/${_id}`}>
            <Card.Title as="div">
              <strong>{name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <div className="my-3">
              <Rating rating={rating} numReviews={numReviews} />
            </div>
          </Card.Text>
          <Card.Text as="h3">${price}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductItem;
