import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import styles from "../../styles/CommentCreateForm.module.css";

function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  // Handle form input changes
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      // Update the comments state by adding the new comment
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      // Update the post state by incrementing the comments count
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      // Clear the comment input after submission
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Row className="mb-3">
        <Col>
          {/* Display profile image */}
          <Row className="justify-content-center">
            <Col>
              <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profileImage} height={30} />
              </Link>
            </Col>
          </Row>
          {/* Form for adding a comment */}
          <Form onSubmit={handleSubmit} className="mt-2">
            <Form.Group className="mb-3" controlId="comment">
              <Form.Label visuallyHidden>Leave your comment here</Form.Label>
              <Form.Control
                className={`${styles.CommentContent}`}
                as="textarea"
                placeholder="Leave your comment here"
                rows={2}
                value={content}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default CommentCreateForm;
