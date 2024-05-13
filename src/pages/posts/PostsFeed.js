import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { axiosReq } from "../../api/axiosDefaults";
import { useLocation } from "react-router-dom";
import Post from "./Post";

function PostsFeed({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [error, setError] = useState(null);
  const { pathName } = useLocation();

  // Set query state for search
  const [query, setQuery] = useState("");

  // Fetch posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Filter applies to the liked-posts route
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
      } catch (err) {
        console.log(err);
        setError(`${message}: Unable to get posts.`);
      }
    };

    fetchPosts();
  }, [pathName, message, filter, query]);

  return (
    <Container>
      <Row className="justify-content-center my-4">
        <Col xs={12} lg={8}>
          {/* Searchbar */}
          <Form onSubmit={(event) => event.preventDefault()}>
            <Form.Label className="d-none">Search</Form.Label>
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              placeholder="Search: Users, Tags, Title"
            />
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} lg={8} className="text-center">
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
    </Container>
  );
}

export default PostsFeed;
