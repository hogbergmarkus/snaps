import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  // Set initial form data
  const [formData, setFormData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = formData;

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", formData);
      navigate("/sign-in");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            {/* Username input field with error messages below it */}
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            {/* Password1 input field with error messages below it */}
            <Form.Group className="mb-3" controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            {/* Password2 input field with error messages below it */}
            <Form.Group className="mb-3" controlId="password2">
              <Form.Label className="d-none">Password again</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password again"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            {/* Submit button with non-field errors messages below it */}
            <Button variant="primary" type="submit">
              Submit
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SignUpForm;
