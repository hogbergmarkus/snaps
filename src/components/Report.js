import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";

const Report = () => {
  return (
    <Accordion flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Report post</Accordion.Header>
        <Accordion.Body>
          <Form>
            <Form.Group controlId="reason">
              <Form.Label visuallyHidden>Report reason</Form.Label>
              <Form.Control type="text" placeholder="Report reason" />
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
