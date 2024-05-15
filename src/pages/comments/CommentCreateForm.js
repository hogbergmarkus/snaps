import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CommentCreateForm() {
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Label className="d-none">Leave your comment here</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Leave your comment here"
            rows={2}
          />
          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default CommentCreateForm;
