import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import { axiosRes } from "../api/axiosDefaults";

const Report = ({ postId, currentUser }) => {
  const [content, setContent] = useState("");

  // Handle form input changes
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = { user: currentUser.pk, post: postId, reason: content };
      await axiosRes.post("/reports/", data);
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Accordion flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Report post</Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="reason">
              <Form.Label visuallyHidden>Report reason</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Report reason"
                value={content}
                name="reason"
                onChange={handleChange}
              />
            </Form.Group>
            <Button className="mt-2" type="submit">
              Report
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Report;
