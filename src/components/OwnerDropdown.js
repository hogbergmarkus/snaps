import React, { forwardRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/OwnerDropdown.module.css";

// Custom toggle for a dropdown menu
const CustomToggle = forwardRef(({ onClick }, ref) => (
  <div className={`${styles.IconDropdown}`}>
    <i
      className="fa-solid fa-caret-down"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    ></i>
  </div>
));

// Dropdown menu for post owner
export const OwnerDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}> </Dropdown.Toggle>

      <Dropdown.Menu popperConfig={{ strategy: "absolute" }}>
        <Dropdown.Item onClick={handleEdit} aria-label="Edit">
          Edit
        </Dropdown.Item>
        <Dropdown.Item onClick={handleDelete} aria-label="Delete">
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
