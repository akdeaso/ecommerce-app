import React from "react";
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

const AppNavbar = ({ onSearch }) => {
  return (
    <Navbar
      bg="dark"
      expand="lg"
      className="sticky-top"
      style={{ zIndex: 100 }}
    >
      <Container>
        <Navbar.Brand href="/" style={{ color: "white" }}>
          E-commerce App
        </Navbar.Brand>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
            className="mr-sm-2"
          />
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <FaBars style={{ color: "white" }} />
        </Navbar.Toggle>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link
              className="mr-auto"
              href="/cart"
              style={{ color: "white" }}
            >
              Cart
            </Nav.Link>
            <Nav.Link
              className="mr-auto"
              href="/login"
              style={{ color: "white" }}
            >
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
