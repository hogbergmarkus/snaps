import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { axiosReq } from "../../api/axiosDefaults";
import { useLocation } from "react-router-dom";
import Post from "./Post";

function PostsFeed({ message }) {
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
          <p>{message}</p>
        )}
      </Col>
    </Row>
  );
}

export default PostsFeed;
