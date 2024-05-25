import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Avatar from "../../components/Avatar";
import CommentEditForm from "./CommentEditForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { OwnerDropdown } from "../../components/OwnerDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  const { like_id, likes_count } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const [showEditForm, setShowEditForm] = useState(false);

  const [error, setError] = useState(null);

  // State to control delete confirmation modal
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Function to handle deleting a comment
  const handleDelete = async () => {
    if (showModal) {
      try {
        await axiosRes.delete(`/comments/${id}/`);
        // Update the post state by decrementing comments count
        setPost((prevPost) => ({
          results: [
            {
              ...prevPost.results[0],
              comments_count: prevPost.results[0].comments_count - 1,
            },
          ],
        }));
        // Update the comments state by deleting comment
        setComments((prevComments) => ({
          ...prevComments,
          // Filter out the deleted comment by its id
          results: prevComments.results.filter((comment) => comment.id !== id),
        }));
      } catch (err) {
        setError("There was an error deleting the comment");
      }
    }
    handleCloseModal();
  };

  // Function to handle liking a comment and updating the comments state
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { comment: id });

      // Update comments state with new like
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? // Checks if the current comment is the one being liked
              {
                ...comment,
                likes_count: comment.likes_count + 1,
                like_id: data.id,
              }
            : comment;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle un-liking a comment and updating the comments state
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);

      // Update comments state by removing a like
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? // Checks if the current comment is the one being un-liked
              {
                ...comment,
                likes_count: comment.likes_count - 1,
                like_id: null,
              }
            : comment;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // Set like button content based on user state
  let likeButtonContent = null;
  if (!like_id && !currentUser) {
    likeButtonContent = (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Sign in to like</Tooltip>}
      >
        <div className={`${styles.Icons}`}>
          <i className="fa-regular fa-thumbs-up"></i> <span>{likes_count}</span>
        </div>
      </OverlayTrigger>
    );
  } else if (!like_id && currentUser) {
    likeButtonContent = (
      <div className={`${styles.Icons}`} onClick={handleLike}>
        <i className="fa-regular fa-thumbs-up"></i> <span>{likes_count}</span>
      </div>
    );
  } else if (like_id && currentUser) {
    likeButtonContent = (
      <div className={`${styles.Icons}`} onClick={handleUnlike}>
        <i className="fa-solid fa-thumbs-up"></i>
        <span>{likes_count}</span>
      </div>
    );
  }

  return (
    <Card className="mt-3 mb-1 pb-4 overflow-hidden">
      <Row className="d-flex">
        <Col className="d-flex align-items-center mt-2">
          {/* Display profile image */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={30} />
          </Link>
          <span className="ms-2">{owner}</span>
          {/* Display dropdown menu for comment owner */}
          <span className="ms-2">
            {is_owner &&
              !showEditForm && ( // Hide dropdown in edit mode
                <OwnerDropdown
                  handleEdit={() => setShowEditForm(true)}
                  handleDelete={handleShowModal}
                />
              )}
          </span>
          {likeButtonContent}
          <div className="flex-grow-1"></div>
          <span className="text-muted me-2">{updated_at}</span>
        </Col>
      </Row>

      {/* Conditionally render either comment content or edit form */}
      <Row className="mt-2">
        <Col>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p className={`${styles.CommentContent}`}>{content}</p>
          )}
        </Col>
      </Row>

      {/* Display error message if there is one */}
      {error && (
        <Row className="mt-3">
          <Col className="text-center">
            <Alert variant="danger">
              <p>{error}</p>
            </Alert>
          </Col>
        </Row>
      )}

      {/* Modal for Delete Confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Comment;
