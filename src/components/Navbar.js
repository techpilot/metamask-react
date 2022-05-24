import React from "react";
import NavbarBootstrap from "react-bootstrap/Navbar";
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
        </NavbarBootstrap>
        <hr style={{ margin: 0 }} />
      </React.Fragment>
    );
  }
}

export default Navbar;
