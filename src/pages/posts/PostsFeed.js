import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { axiosReq } from "../../api/axiosDefaults";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import SuccessToastNotification from "../../components/SuccessToastNotification";
import ErrorToastNotification from "../../components/ErrorToastNotification";

function PostsFeed({ message = "No posts found.", filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [error, setError] = useState(null);
  const { pathname } = useLocation();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [searchParams] = useSearchParams();
  const [toastShow, setToastShow] = useState(false);
  const [toastSignOutShow, setToastSignOutShow] = useState(false);
  const [profileEditError, setProfileEditError] = useState(false);
  const navigate = useNavigate();

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
        setHasLoaded(true);
        setError("There was an error trying to get posts.");
      }
    };

    fetchPosts();
  }, [pathname, message, filter, query]);

  // Toast notifications for sign-in, sign-out, and error editing profile
  useEffect(() => {
    const showToastNotifications = () => {
      if (localStorage.getItem("showSignInToast") === "true") {
        setToastShow(true);
        localStorage.removeItem("showSignInToast");
      }

      if (searchParams.get("sign-out") === "success") {
        setToastSignOutShow(true);
        navigate("/", { replace: true });
      }

      if (searchParams.get("edit-profile") === "error") {
        setProfileEditError(true);
        navigate("/", { replace: true });
      }
    };

    showToastNotifications();
  }, [searchParams, navigate]);

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
        message="You have signed in!"
      />

      {/* Success Toast Notification on Sign Out */}
      <SuccessToastNotification
        show={toastSignOutShow}
        onClose={() => setToastSignOutShow(false)}
        position="bottom-end"
        message="You have signed out!"
      />

      {/*Error Toast Notification on fetching profile */}
      <ErrorToastNotification
        show={profileEditError}
        onClose={() => setProfileEditError(false)}
        position="bottom-end"
        message="There was an error fetching the profile data"
      />
    </Container>
  );
}

export default PostsFeed;
