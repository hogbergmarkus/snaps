import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

// Success Toast Notification
function SuccessToastNotification({ show, onClose, position, message }) {
  return (
    <ToastContainer className="p-3" position={position} style={{ zIndex: 1 }}>
      <Toast onClose={onClose} show={show} delay={4000} autohide bg="success">
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Success</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default SuccessToastNotification;
