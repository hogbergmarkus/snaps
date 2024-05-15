import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { axiosRes } from "../../api/axiosDefaults";

function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;
  const [formContent, setFormContent] = useState(content);

  // Handle form input changes
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  // Handle form submission for updating comments
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(), // Send trimmed comment content
      });
      // Update the state to reflect the change
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          // Find the correct comment to update
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(), // Update content
                updated_at: "now",
              }
            : comment; // Return other comments unchanged
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Row className="mb-3">
        <Col>
          {/* Form for adding a comment */}
          <Form onSubmit={handleSubmit} className="mt-2">
            <Form.Group className="mb-3">
              <Form.Label className="d-none">
                Update your comment here
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Leave your comment here"
                rows={2}
                value={formContent}
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              className="me-2"
              variant="secondary"
              type="button"
              onClick={() => setShowEditForm(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" disabled={!content.trim()} type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default CommentEditForm;
