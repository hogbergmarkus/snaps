import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Post from "./Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";

function PostDetail() {
  // Access id of post in the url
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentUser = useCurrentUser();
  const [comments, setComments] = useState({ results: [] });
  const profile_image = currentUser?.profile_image;

  // Fetch post details when component mounts
  useEffect(() => {
    const handleMount = async () => {
      setLoading(true);
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments)
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error: Unable to get post.");
        setLoading(false);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Container>
      <Row className="justify-content-center my-4">
        <Col xs={12} lg={8}>
          {/* Display loading spinner, error message, or post */}
          {loading ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <Spinner animation="grow" />
            </div>
          ) : error ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <Alert variant="danger">{error}</Alert>
            </div>
          ) : (
            <Post {...post.results[0]} setPosts={setPost} postPage />
          )}
        </Col>
      </Row>

      {/* Display comment form if user is logged in */}
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            comments.results.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PostDetail;
