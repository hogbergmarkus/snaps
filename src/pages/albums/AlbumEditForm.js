import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function AlbumEditForm({ album, setIsEditing, setAlbums }) {
  // Close the edit form when the user cancels
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Form>
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Form.Group controlId="title">
            <Form.Label visuallyHidden>Album title</Form.Label>
            <Form.Control type="text" placeholder={album.title} name="title" />
            <Form.Control.Feedback type="invalid">
              {/* Display error message */}
              <p>Something went wrong</p>
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Button type="submit">Save</Button>

          <Button variant="secondary" type="submit" onClick={handleCancel}>
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default AlbumEditForm;
