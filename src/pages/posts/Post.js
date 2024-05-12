import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import ImageAsset from "../../components/ImageAsset";
import styles from "../../styles/Post.module.css";

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
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

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
      console.log(err);
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

      {/* Display Likes- Comments- and Download count */}
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={8}>
          <div className="d-flex justify-content-center">
            {likeButtonContent}
            <Link to={`/posts/${id}`} className={`${styles.Link}`}>
              <div className={`${styles.Icons}`}>
                <i class="fa-regular fa-comment"></i>{" "}
                <span>{comments_count}</span>
              </div>
            </Link>
            <a
              href={image}
              target="_blank"
              rel="noreferrer"
              aria-label="Go to download post image, opens in a new tab"
              className={`${styles.Link}`}
              onClick={() => {}}
            >
              <div className={`${styles.Icons}`}>
                <i class="fa-solid fa-download"></i>{" "}
                <span>{download_count}</span>
              </div>
            </a>
          </div>
        </Col>
      </Row>

      {/* Display post content here */}
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={8}>
          <p className="text-center">{content}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Post;
