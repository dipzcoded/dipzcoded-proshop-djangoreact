import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ pages, page, keyword, isAdmin = false }) {
  const resKey = !keyword ? "" : keyword;
  console.log("damn");
  return (
    pages > 1 && (
      <Pagination>
        {[...new Array(pages)].map((el, index) => (
          <LinkContainer
            key={index + 1}
            to={
              !isAdmin
                ? `/?keyword=${resKey}&page=${index + 1}`
                : `/admin/productlist/?keyword=${resKey}&page=${index + 1}`
            }
          >
            <Pagination.Item active={index + 1 === page}>
              {index + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
