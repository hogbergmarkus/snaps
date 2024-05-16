import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { axiosRes } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

const AlbumCreateForm = () => {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosRes.post("/albums/", { title: content });
      setContent("");
      setErrors({});
      navigate(`/albums/${response.data.id}`);
    } catch (err) {
      setErrors(err.response?.data);
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xs={10}>
          <Form.Group controlId="title">
            <Form.Label visuallyHidden>Album title</Form.Label>
            <Form.Control
              type="text"
              placeholder="New album title"
              name="title"
              value={content}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {/* Display error message */}
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Button type="submit">Create</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AlbumCreateForm;
