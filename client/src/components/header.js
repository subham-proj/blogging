import React, { useContext } from "react";
import { Context } from "../context/context";

import { Navbar, Container, Nav } from "react-bootstrap";

import { NavLink, Link } from "react-router-dom";

export default function Header() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="transparent">
        <Container>
          <Navbar.Brand
            to="/"
            as={Link}
            style={{
              color: "#48cae4",
              fontSize: "xx-large",
              fontWeight: "bold",
            }}
          >
            Blogging.
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto nav">
              <NavLink
                exact={true}
                activeClassName="active"
                to="/"
                className="navLink"
              >
                Home
              </NavLink>

              <NavLink activeClassName="active" to="/write" className="navLink">
                Write
              </NavLink>
            </Nav>

            {!user ? (
              <Nav className="ms-auto nav">
                <NavLink
                  activeClassName="active"
                  to="/login"
                  className="navLink"
                >
                  Login
                </NavLink>
                <NavLink
                  activeClassName="active"
                  to="/register"
                  className="navLink"
                >
                  Register
                </NavLink>
              </Nav>
            ) : (
              <Nav className="ms-auto nav">
                <NavLink
                  activeClassName="active"
                  to={`/users/${user._id}`}
                  className="navLink"
                >
                  {`${user.username}`}
                </NavLink>
                <NavLink
                  activeClassName="active"
                  to="/"
                  onClick={handleLogout}
                  className="navLink"
                >
                  Logout
                </NavLink>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
