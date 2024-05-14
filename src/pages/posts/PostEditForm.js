import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import ImageAsset from "../../components/ImageAsset";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function PostEditForm() {
  const [errors, setErrors] = useState({});

  // useState to manage form data
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags: "",
    image: "",
  });
  const { title, content, tags, image } = postData;

  // Ref to the image input to handle uploads
  const imageInput = useRef(null);

  const navigate = useNavigate();

  const { id } = useParams();

  // Fetch post details when component mounts
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, content, image, tags, is_owner } = data;

        is_owner ? setPostData({ title, content, image, tags }) : navigate("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id, navigate]);

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

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Create form data to send and append data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    formData.append("tags", tags);
    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      navigate(`/posts/${id}/`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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
            {errors.title?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
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
            {errors.content?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
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
            {errors.tags?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
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
                ref={imageInput}
              />
            </Form.Group>
            {errors.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>

        {/* Display preview image */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            {image && <ImageAsset src={image} alt={title} />}
          </Col>
        </Row>

        {/* Submit button and Cancel button */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Button
              variant="secondary"
              className="mt-3"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="mt-3 ms-2">
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
}

export default PostEditForm;