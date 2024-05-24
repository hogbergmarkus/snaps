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
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import SuccessToastNotification from "../../components/SuccessToastNotification";

function PostsFeed({ message = "No posts found.", filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [error, setError] = useState(null);
  const { pathName } = useLocation();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [toastShow, setToastShow] = useState(false);

  // Set query state for search
  const [query, setQuery] = useState("");

  // Fetch posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Filter applies to the liked-posts route
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
        setError(`${message}: Unable to get posts.`);
      }
    };

    fetchPosts();
  }, [pathName, message, filter, query]);

  // Show toast notification when user signs in
  useEffect(() => {
    if (localStorage.getItem("showSignInToast") === "true") {
      setToastShow(true);
      localStorage.removeItem("showSignInToast");
    }
  }, []);

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
          {/* Display loading spinner until data is loaded */}
          {!hasLoaded ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <Spinner animation="grow" />
            </div>
          ) : error ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <Alert variant="danger">{error}</Alert>
            </div>
          ) : posts.results && posts.results.length > 0 ? (
            <InfiniteScroll
              children={posts.results.map((post) => (
                <Post key={post.id} {...post} setPosts={setPosts} />
              ))}
              dataLength={posts.results.length}
              loader={<Spinner animation="grow" />}
              hasMore={!!posts.next}
              next={() => fetchMoreData(posts, setPosts)}
            />
          ) : (
            <div className="d-flex justify-content-center">
              <Alert variant="info">{message}</Alert>
            </div>
          )}
        </Col>
      </Row>

      {/* Success Toast Notification */}
      <SuccessToastNotification
        show={toastShow}
        onClose={() => setToastShow(false)}
        position="bottom-end"
        message="You have successfully signed in!"
      />
    </Container>
  );
}

export default PostsFeed;
