import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageAsset from "../../components/ImageAsset";

function PostCreateForm() {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags: "",
    image: "",
  });
  const { title, content, tags, image } = postData;

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
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
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label className="d-none">Title</Form.Label>
              <Form.Control type="text" placeholder="Title" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="content" className="mb-3">
              <Form.Label className="d-none">Content</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Content" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="tags" className="mb-3">
              <Form.Label className="d-none">Tags</Form.Label>
              <Form.Control type="text" placeholder="Tags" />
            </Form.Group>
          </Col>
        </Row>

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

        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            {image && (
              <ImageAsset src={image} alt={title} />
            )}
          </Col>
        </Row>

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
