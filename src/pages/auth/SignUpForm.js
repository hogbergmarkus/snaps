import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = formData;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
      <Form>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
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
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
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
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
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
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SignUpForm;
