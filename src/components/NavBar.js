import React, { useContext, useState } from "react";
import styles from "../styles/NavBar.module.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../App";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  // Functions to toggle the navbar offcanvas show/hide
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loggedOutIcons = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
        }
        to="/sign-in"
        onClick={handleClose}
      >
        Sign in
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
        }
        to="/register"
        onClick={handleClose}
      >
        Register
      </NavLink>
    </>
  );
  const loggedInIcons = <>{currentUser?.username}</>;

  return (
    <Navbar expand="md" sticky="top">
      <Container fluid>
        <NavLink className={styles.BrandText} to="/">
          <Navbar.Brand className={styles.BrandTextSize}>Snaps</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
        <Navbar.Offcanvas
          show={show}
          onHide={handleClose}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.NavLink} ${styles.active}`
                    : styles.NavLink
                }
                to="/"
                onClick={handleClose}
              >
                Home
              </NavLink>
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
