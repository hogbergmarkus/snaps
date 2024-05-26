import React, { useState } from "react";
import styles from "../styles/NavBar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Alert from "react-bootstrap/Alert";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import useToggleNavBar from "../hooks/useToggleNavBar";

const NavBar = () => {
  // Use hook to control the offcanvas menu
  const { show, handleShow, handleClose } = useToggleNavBar();

  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  // Get current user from context
  const currentUser = useCurrentUser();

  // Set current user in context
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      navigate("/?sign-out=success");
    } catch (err) {
      setError(err.response?.data);
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
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.NavLink} ${styles.active}` : styles.NavLink
        }
        to="/posts/create"
        onClick={handleClose}
      >
        Add post
      </NavLink>
      <NavDropdown
        title={currentUser?.username}
        id="offcanvasNavbarDropdown"
        className={styles.NavDropdown}
        drop="down"
      >
        <NavDropdown.Item
          as={NavLink}
          to={`/profiles/${currentUser?.profile_id}`}
          className={`${styles.NavLink} ${
            location.pathname.startsWith("/profiles") ? styles.active : ""
          }`}
          onClick={handleClose}
        >
          Profile
        </NavDropdown.Item>

        <NavDropdown.Item
          as={NavLink}
          to="/albums"
          className={`${styles.NavLink} ${
            location.pathname.startsWith("/albums") ? styles.active : ""
          }`}
          onClick={handleClose}
        >
          Albums
        </NavDropdown.Item>

        <NavDropdown.Item
          as={NavLink}
          to="/liked-posts"
          className={`${styles.NavLink} ${
            location.pathname === "/liked-posts" ? styles.active : ""
          }`}
          onClick={handleClose}
        >
          Liked Posts
        </NavDropdown.Item>

        <NavDropdown.Item
          as={NavLink}
          to="/"
          onClick={() => {
            handleSignOut();
            handleClose();
          }}
          className={`${styles.NavLink} ${
            location.pathname === "/" ? styles.active : ""
          }`}
        >
          Sign out
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );

  return (
    <Navbar expand="md" sticky="top" className={`${styles.NavBar}`}>
      <Container fluid>
        {/* Brand text/logo here */}
        <NavLink className={`${styles.BrandText}`} to="/">
          <Navbar.Brand className={`${styles.BrandTextSize}`}>
            Snaps
          </Navbar.Brand>
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
            {/* Error message */}
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
