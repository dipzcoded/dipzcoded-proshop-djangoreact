import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SearchBox() {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
      setKeyword("");
    } else {
      history.push(history.location.pathname);
    }
  };

  return (
    <Form onSubmit={onSubmit} inline>
      <Form.Control
        type="text"
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;
