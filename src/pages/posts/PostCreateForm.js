import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageAsset from "../../components/ImageAsset";

function PostCreateForm() {
  // useState to manage form data
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags: "",
    image: "",
  });
  const { title, content, tags, image } = postData;

  // Handle form input changes
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle image upload, sets image url in state
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      // Revoke previous image url
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  return (
    <Container>
      <Form>
        {/* Title form input */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label className="d-none">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Textarea form input */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="content" className="mb-3">
              <Form.Label className="d-none">Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Content"
                name="content"
                value={content}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Tags form input */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="tags" className="mb-3">
              <Form.Label className="d-none">Tags</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tags"
                name="tags"
                value={tags}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Image upload */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>
                Image formats supported are jpg, jpeg and png
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleChangeImage}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Display preview image */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            {image && <ImageAsset src={image} alt={title} />}
          </Col>
        </Row>

        {/* Submit button */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default PostCreateForm;
