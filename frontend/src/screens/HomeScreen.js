import React, { useState, useEffect } from "react";
import axios from "axios";
// import products from "../products";
import { Row } from "react-bootstrap";
import ProductItem from "../components/ProductItem";
function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get("/api/products/");
      setProducts(data);
    };
    getProducts();
  }, [setProducts]);

  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <ProductItem key={product._id} {...product} />
        ))}
      </Row>
    </div>
  );
}

export default HomeScreen;
