import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import ImageAsset from "../../components/ImageAsset";

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
    tags,
    updated_at,
    postPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  // Set like button content based on user state
  let likeButtonContent = null;
  if (!like_id && !currentUser) {
    likeButtonContent = (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Sign in to like</Tooltip>}
      >
        <span className="d-flex justify-content-end mt-1">
          <i className="fa-regular fa-thumbs-up"></i> {likes_count}
        </span>
      </OverlayTrigger>
    );
  } else if (!like_id && currentUser) {
    likeButtonContent = (
      <span className="d-flex justify-content-end mt-1" onClick={() => {}}>
        <i className="fa-regular fa-thumbs-up"></i> {likes_count}
      </span>
    );
  } else if (like_id && currentUser) {
    likeButtonContent = (
      <span className="d-flex justify-content-end mt-1" onClick={() => {}}>
        <i className="fa-solid fa-thumbs-up"></i> {likes_count}
      </span>
    );
  }

  return (
    <Container>
      {/* Image title goes here */}
      <Row className="justify-content-center">
        <Col xs={6} md={6} lg={4}>
          {title}
        </Col>
        <Col xs={6} md={6} lg={4}>
          <p className="text-end">
            By: {owner}{" "}
            {is_owner && postPage && <i class="fa-solid fa-caret-down"></i>}
          </p>
        </Col>
      </Row>

      {/* Display post image here */}
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={8}>
          <Link to={`/posts/${id}`}>
            <ImageAsset src={image} alt={title} />
          </Link>
        </Col>
      </Row>

      {/* Display Content, Likes- Comments- and Download count */}
      <Row className="justify-content-center">
        <Col xs={10} md={10} lg={6}>
          <p className="text-start">{content}</p>
        </Col>
        <Col xs={2} md={2} lg={2}>
          <span className="d-flex justify-content-end mt-1">
            {likeButtonContent}
          </span>
          <span className="d-flex justify-content-end mt-1">
            <i class="fa-regular fa-comments"></i> {comments_count}
          </span>
          <span className="d-flex justify-content-end mt-1">
            <i class="fa-solid fa-download"></i> {download_count}
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default Post;
