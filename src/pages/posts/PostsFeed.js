import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { axiosReq } from "../../api/axiosDefaults";
import { useLocation } from "react-router-dom";
import Post from "./Post";

function PostsFeed({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [error, setError] = useState(null);
  const { pathName } = useLocation();

  // Fetch posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Filter applies to the liked-posts route
        const { data } = await axiosReq.get(`/posts/?${filter}`);
        setPosts(data);
      } catch (err) {
        console.log(err);
        setError(`${message}: Unable to get posts.`);
      }
    };

    fetchPosts();
  }, [pathName, message, filter]);

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={12} lg={8} className="text-center">
        {/* Display error message, show posts on success, else show loading spinner */}
        {error ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Alert variant="danger">{error}</Alert>
          </div>
        ) : posts.results && posts.results.length > 0 ? (
          posts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setPosts} />
          ))
        ) : (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="grow" />
          </div>
        )}
      </Col>
    </Row>
  );
}

export default PostsFeed;
