import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { axiosReq } from "../../api/axiosDefaults";
import { useLocation } from "react-router-dom";
import Post from "./Post";

function PostsFeed() {
  const [posts, setPosts] = useState({ results: [] });
  const { pathName } = useLocation();

  // Fetch posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get("/posts/");
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [pathName]);

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={12} lg={8} className="text-center">
        {/* Display posts if they exist and have loaded */}
        {posts.results && posts.results.length > 0 ? (
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
