import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

// Error Toast Notification
function ErrorToastNotification({ show, onClose, position, message }) {
  return (
    <ToastContainer
      className="p-3"
      position={position}
      style={{ zIndex: 1, position: "fixed", bottom: 0, right: 0 }}
    >
      <Toast onClose={onClose} show={show} delay={4000} autohide bg="danger">
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Error</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body style={{ color: "white" }}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ErrorToastNotification;
