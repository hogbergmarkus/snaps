import React from "react";
import styles from "../styles/NavBar.module.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import useToggleNavBar from "../hooks/useToggleNavBar";

const NavBar = () => {
  // Use hook to control the offcanvas menu
  const { show, handleShow, handleClose } = useToggleNavBar();

  // Get current user from context
  const currentUser = useCurrentUser();

  // Set current user in context
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  // Display navigation links for logged out users
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

  // Display navigation links for logged in users in a dropdown menu
  const loggedInIcons = (
    <>
      <NavDropdown title={currentUser?.username} id="offcanvasNavbarDropdown">
        <NavDropdown.Item>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
            }
            to="/profile"
            onClick={handleClose}
          >
            Profile
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
            }
            to="/albums"
            onClick={handleClose}
          >
            Albums
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
            }
            to="/liked-posts"
            onClick={handleClose}
          >
            Liked Posts
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
            }
            to="/"
            onClick={() => {
              handleSignOut();
              handleClose();
            }}
          >
            Sign out
          </NavLink>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );

  return (
    <Navbar expand="md" sticky="top">
      <Container fluid>
        {/* Brand text/logo here */}
        <NavLink className={styles.BrandText} to="/">
          <Navbar.Brand className={styles.BrandTextSize}>Snaps</Navbar.Brand>
        </NavLink>
        {/* Toggle for offcanvas menu */}
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
              {/* Display different navigation links based on user login status */}
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
