import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Accordion from "react-bootstrap/Accordion";
import { axiosRes } from "../api/axiosDefaults";
import ErrorToastNotification from "./ErrorToastNotification";
import SuccessToastNotification from "./SuccessToastNotification";
import styles from "../styles/Report.module.css";

const Report = ({ postId, currentUser }) => {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const [reportErrorShow, setReportErrorShow] = useState(false);
  const [reportSuccessShow, setReportSuccessShow] = useState(false);

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
      setReportSuccessShow(true);
    } catch (err) {
      setErrors(err);
      setReportErrorShow(true);
    }
  };

  return (
    <>
      <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Report post</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="reason">
                <Form.Label visuallyHidden>Report reason</Form.Label>
                <Form.Control
                  className={`${styles.ReportContent}`}
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
              {errors.non_field_errors?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Error Toast Notification for reporting post */}
      <ErrorToastNotification
        show={reportErrorShow}
        onClose={() => setReportErrorShow(false)}
        position="bottom-end"
        message={"There was an error reporting this post!"}
      />
      {/* Success Toast Notification for reporting post */}
      <SuccessToastNotification
        show={reportSuccessShow}
        onClose={() => setReportSuccessShow(false)}
        position="bottom-end"
        message={"Your report has been submitted!"}
      />
    </>
  );
};

export default Report;
