import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ProfileEditForm() {
  return (
    <Container>
      <Form>
        {/* Username form input */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label visuallyHidden>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Textarea form input for bio */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="bio" className="mb-3">
              <Form.Label visuallyHidden>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Bio"
                name="bio"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Image upload */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label visuallyHidden>Profile Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={() => {}} />
            </Form.Group>
          </Col>
        </Row>

        {/* Display preview image */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <p>Preview image</p>
          </Col>
        </Row>

        {/* Submit button and Cancel button */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Button variant="secondary" className="mt-3">
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="mt-3 ms-2">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default ProfileEditForm;
