import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "../posts/Post";

function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [albumPosts, setAlbumPosts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Fetch album posts
  useEffect(() => {
    const fetchAlbumPosts = async () => {
      try {
        // Fetch album details to get post ids, and get the album title
        const albumResponse = await axiosReq.get(`/albums/${id}`);
        // Need this to display album title
        setAlbum(albumResponse.data);
        const postIds = albumResponse.data.posts;

        // Fetch posts for each post id
        const postPromises = postIds.map((postId) =>
          axiosReq.get(`/posts/${postId}/`)
        );
        // Wait for all post requests
        const postResponses = await Promise.all(postPromises);

        // Extract post data and set state
        const posts = postResponses.map((response) => response.data);
        setAlbumPosts(posts);
        setHasLoaded(true);
      } catch (err) {
        setError("Unable to get album posts.");
        setHasLoaded(true);
      }
    };
    fetchAlbumPosts();
  }, [id]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} lg={8} className="text-center">
          <h4>{album?.title}</h4>
        </Col>
      </Row>
      <Row className="justify-content-center my-4">
        <Col xs={12} lg={8} className="text-center">
          {!hasLoaded ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <Spinner animation="grow" />
            </div>
          ) : error ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <Alert variant="danger">{error}</Alert>
            </div>
          ) : albumPosts && albumPosts.length > 0 ? (
            albumPosts.map((post) => (
              <Post key={post.id} {...post} setPosts={setAlbumPosts} />
            ))
          ) : (
            <Alert variant="info">No posts in this album yet.</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AlbumDetail;
