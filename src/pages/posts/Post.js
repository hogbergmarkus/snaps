import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import ImageAsset from "../../components/ImageAsset";
import styles from "../../styles/Post.module.css";
import Avatar from "../../components/Avatar";
import { OwnerDropdown } from "../../components/OwnerDropdown";
import ErrorToastNotification from "../../components/ErrorToastNotification";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    download_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const navigate = useNavigate();
  const [likeErrorShow, setLikeErrorShow] = useState(false);
  const [unlikeErrorShow, setUnlikeErrorShow] = useState(false);

  // State to control delete confirmation modal
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Function to handle editing a post
  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

  // Function to handle deleting a post if showModal is true
  const handleDelete = async () => {
    if (showModal) {
      try {
        await axiosRes.delete(`/posts/${id}/`);
        localStorage.setItem("showPostDeleteToast", "true");
        navigate(`/profiles/${profile_id}`);
      } catch (err) {
        localStorage.setItem("showErrorPostDeleteToast", "true");
        navigate(`/profiles/${profile_id}`);
      }
    }
    handleCloseModal();
  };

  // Function to handle liking a post and updating the posts state
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });

      // Update posts state with new like
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? // Checks if the current post is the one being liked
              { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      setLikeErrorShow(true);
    }
  };

  // Function to handle un-liking a post and updating the posts state
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);

      // Update posts state by removing a like
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? // Checks if the current post is the one being un-liked
              { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      setUnlikeErrorShow(true);
    }
  };

  const handleDownload = async () => {
    try {
      await axiosRes.post(`/posts/${id}/download/`);

      // Update posts state with new download
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? // Checks if the current post is the one being downloaded
              {
                ...post,
                download_count: post.download_count + 1,
              }
            : post;
        }),
      }));
    } catch (err) {
      /* eslint-disable no-empty */
      // This block is empty intentionally
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

  // Set download button content based on user state
  let downloadButtonContent = null;
  if (!currentUser) {
    downloadButtonContent = (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Sign in to download</Tooltip>}
      >
        <div className={`${styles.Icons}`}>
          <i className="fa-solid fa-download"></i> <span>{download_count}</span>
        </div>
      </OverlayTrigger>
    );
  } else {
    downloadButtonContent = (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Download, opens a new tab</Tooltip>}
      >
        <a
          href={image}
          target="_blank"
          rel="noreferrer"
          aria-label="Go to download post image, opens in a new tab"
          className={`${styles.Link}`}
          onClick={handleDownload}
        >
          <div className={`${styles.Icons}`}>
            <i className="fa-solid fa-download"></i>{" "}
            <span>{download_count}</span>
          </div>
        </a>
      </OverlayTrigger>
    );
  }

  return (
    <Container fluid>
      {/* Image title, Avatar and dropdown menu for post owner goes here */}
      <Row className="justify-content-center">
        <Col xs={8} className="align-self-center text-start">
          <span className="ms-1">{title}</span>
        </Col>
        <Col xs={4} className="d-flex align-self-center justify-content-end">
          <div className="d-flex align-items-center">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{owner}</Tooltip>}
            >
              <Link to={`/profiles/${profile_id}`} className={`${styles.Link}`}>
                <Avatar src={profile_image} />{" "}
              </Link>
            </OverlayTrigger>
            {is_owner && postPage && (
              <OwnerDropdown
                handleEdit={handleEdit}
                handleDelete={handleShowModal}
              />
            )}
          </div>
        </Col>
      </Row>

      {/* Display post image here */}
      <Row className="justify-content-center">
        <Col>
          <Link to={`/posts/${id}`}>
            <ImageAsset src={image} alt={title} />
          </Link>
        </Col>
      </Row>

      {/* Display Likes- Comments- Download count and updated at */}
      <Row className="justify-content-center">
        <Col>
          <div className="d-flex justify-content-center">
            {likeButtonContent}
            <Link to={`/posts/${id}`} className={`${styles.Link}`}>
              <div className={`${styles.Icons}`}>
                <i className="fa-regular fa-comment"></i>{" "}
                <span>{comments_count}</span>
              </div>
            </Link>
            {downloadButtonContent}
            <div className="d-flex flex-grow-1 align-self-center justify-content-end me-2">
              <span>{updated_at}</span>
            </div>
          </div>
        </Col>
      </Row>

      {/* Display post content here */}
      <Row className="justify-content-center">
        <Col>
          <p className={`${styles.PostContent}`}>{content}</p>
        </Col>
        <hr></hr>
      </Row>

      {/* Modal for Delete Confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Toast Notification for likes */}
      <ErrorToastNotification
        show={likeErrorShow}
        onClose={() => setLikeErrorShow(false)}
        position="bottom-end"
        message="There was an error liking the post!"
      />
      {/* Error Toast Notification for Unlike */}
      <ErrorToastNotification
        show={unlikeErrorShow}
        onClose={() => setUnlikeErrorShow(false)}
        position="bottom-end"
        message="There was an error removing the like!"
      />
    </Container>
  );
};

export default Post;
