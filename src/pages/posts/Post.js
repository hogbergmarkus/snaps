import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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

  return (
    <Container>
      {/* Image title goes here */}
      <Row className="justify-content-center">
        <Col xs={6} md={6} lg={4}>
          {title}
        </Col>
        <Col xs={6} md={6} lg={4}>
          <p className="text-end">By: {owner}</p>
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

      {/* Display Content here */}
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={8}>
          <p className="text-center">{content}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Post;
