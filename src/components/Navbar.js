import React from "react";
import NavbarBootstrap from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";

import "./Navbar.scss";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authService: {
        isLoggedIn: false,
      },
      searchQuery: "",
    };
  }

  render() {
    return (
      <React.Fragment>
        <NavbarBootstrap bg="white" expand="md" className="Navbar px-5">
          <NavbarBootstrap.Brand className="nav-logo">
            <Link to="/">Crypto</Link>
          </NavbarBootstrap.Brand>
          <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
          <NavbarBootstrap.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Form inline></Form>

              <Link to="/practice" className="nav-item">
                Practice
              </Link>
            </Nav>
          </NavbarBootstrap.Collapse>
        </NavbarBootstrap>
        <hr style={{ margin: 0 }} />
      </React.Fragment>
    );
  }
}

export default Navbar;
