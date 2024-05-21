import React from "react";
import Alert from "react-bootstrap/Alert";

const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Alert variant="info">
        <p>Sorry, the page you are looking for does not exist</p>
      </Alert>
    </div>
  );
};

export default NotFound;
