import React, { useEffect, useState } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/users";
import SearchBox from "../SearchBox";

function Header() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userLogin);

  const [username, setUserName] = useState("");

  useEffect(() => {
    if (userData) {
      setUserName(userData?.name);
    }
  }, [userData, setUserName]);

  const onLogout = () => {
    dispatch(logout());
  };

  const isAdminUser = (
    <>
      <NavDropdown title="admin" id="adminmenu">
        <LinkContainer to="/admin/userlist">
          <NavDropdown.Item>users</NavDropdown.Item>
        </LinkContainer>

        <LinkContainer to="/admin/orderlist">
          <NavDropdown.Item>orders</NavDropdown.Item>
        </LinkContainer>

        <LinkContainer to="/admin/productlist">
          <NavDropdown.Item>products</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
    </>
  );

  const authUser = (
    <>
      <LinkContainer to="/cart">
        <Nav.Link>
          <i className="fas fa-shopping-cart"></i> Cart
        </Nav.Link>
      </LinkContainer>

      <NavDropdown title={username} id="username">
        <LinkContainer to="/profile">
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>

        <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
      </NavDropdown>

      {userData?.isAdmin && isAdminUser}
    </>
  );

  const guestUser = (
    <>
      <LinkContainer to="/cart">
        <Nav.Link>
          <i className="fas fa-shopping-cart"></i> Cart
        </Nav.Link>
      </LinkContainer>

      <LinkContainer to="/login">
        <Nav.Link>
          <i className="fas fa-user"></i> Login
        </Nav.Link>
      </LinkContainer>
    </>
  );
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Proshop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-auto">{userData ? authUser : guestUser}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
