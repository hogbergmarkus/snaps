import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData } from "../../utils/utils";
import Post from "./Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";
import SuccessToastNotification from "../../components/SuccessToastNotification";
import ErrorToastNotification from "../../components/ErrorToastNotification";
import styles from "../../styles/PostDetail.module.css";

function PostDetail() {
  // Access id of post in the url
  const { id } = useParams();

  const [post, setPost] = useState({ results: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [albums, setAlbums] = useState({ results: [] });
  const [selectedAlbum, setSelectedAlbum] = useState("");

  const [toastShow, setToastShow] = useState(false);
  const [albumToastShow, setAlbumToastShow] = useState(false);
  const [commentToastShow, setCommentToastShow] = useState(false);
  const [albumErrorShow, setAlbumErrorShow] = useState(false);

  const currentUser = useCurrentUser();
  const [comments, setComments] = useState({ results: [] });
  const profile_image = currentUser?.profile_image;

  // Fetch post details when component mounts
  useEffect(() => {
    const handleMount = async () => {
      setLoading(true);
      try {
        // Get post, comments, and if a user is logged in also get albums
        const postPromise = axiosReq.get(`/posts/${id}`);
        const commentsPromise = axiosReq.get(`/comments/?post=${id}`);
        const albumsPromise = currentUser
          ? axiosReq.get(`/albums/?owner=${currentUser.profile_id}`)
          : Promise.resolve({ data: { results: [] } });

        const [{ data: post }, { data: comments }, { data: albums }] =
          await Promise.all([postPromise, commentsPromise, albumsPromise]);

        // Set state with fetched data
        setPost({ results: [post] });
        setComments(comments);
        setAlbums(albums);
        setLoading(false);
      } catch (err) {
        setError("Error: Unable to get post.");
        setLoading(false);
      }
    };

    handleMount();
  }, [id, currentUser]);

  // Show toast notification when user successfully adds a post
  useEffect(() => {
    if (localStorage.getItem("showPostCreateToast") === "true") {
      setToastShow(true);
      localStorage.removeItem("showPostCreateToast");
    }
  }, []);

  // Function to add post to an album
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Fetch details of selected album
      const { data: album } = await axiosReq.get(`/albums/${selectedAlbum}/`);

      // Create a new list of posts and add selected post to it
      const updatedPosts = [...album.posts, id];

      // Update album with new list of posts
      await axiosReq.put(`/albums/${selectedAlbum}/`, {
        posts: updatedPosts,
      });

      // Add success toast notification
      setAlbumToastShow(true);

      // Clear selected album input
      setSelectedAlbum("");
    } catch (err) {
      setAlbumErrorShow(true);
    }
  };

  return (
    <Container className="pb-5">
      <Row className="justify-content-center my-4">
        <Col xs={12} lg={8}>
          {/* Display loading spinner, error message, or post */}
          {loading ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <Spinner animation="grow" />
            </div>
          ) : error ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <Alert variant="danger">{error}</Alert>
            </div>
          ) : (
            <Post {...post.results[0]} setPosts={setPost} postPage />
          )}
        </Col>
      </Row>

      {/* Display form for adding post to an album if user is logged in */}
      {currentUser ? (
        <Row className="justify-content-center my-4">
          <Col xs={12} lg={8}>
            <p>Add this post to an album</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label visuallyHidden>Select Album</Form.Label>
                <Form.Control
                  as="select"
                  className={`${styles.AlbumSelect}`}
                  value={selectedAlbum}
                  onChange={(event) => setSelectedAlbum(event.target.value)}
                >
                  {/* Conditionally render options depending on if user has albums */}
                  <option value="">Choose an Album...</option>
                  {albums.results.length === 0 ? (
                    <option value="" disabled>
                      You have not added any albums yet
                    </option>
                  ) : (
                    albums.results.map((album) => (
                      <option key={album.id} value={album.id}>
                        {album.title}
                      </option>
                    ))
                  )}
                </Form.Control>
              </Form.Group>
              {/* Display submit button if user has albums, else disable it */}
              {albums.results.length > 0 ? (
                <Button variant="primary" type="submit" className="mt-2">
                  Save to Album
                </Button>
              ) : (
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-2"
                  disabled
                >
                  Save to Album
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      ) : null}

      {/* Display comment form if user is logged in */}
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {/* Display comments with infinite scroll */}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setPost}
                  setComments={setComments}
                  onDelete={() => setCommentToastShow(true)}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Spinner animation="grow" />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : // Display message if there are no comments
          currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Col>
      </Row>

      {/* Success Toast Notification on uploading post */}
      <SuccessToastNotification
        show={toastShow}
        onClose={() => setToastShow(false)}
        position="bottom-end"
        message="Post added successfully!"
      />
      {/* Success Toast Notification on adding post to album */}
      <SuccessToastNotification
        show={albumToastShow}
        onClose={() => setAlbumToastShow(false)}
        position="bottom-end"
        message="Added to album successfully!"
      />
      {/* Success Toast Notification on deleting comment */}
      <SuccessToastNotification
        show={commentToastShow}
        onClose={() => setCommentToastShow(false)}
        position="bottom-end"
        message="Comment deleted!"
      />
      {/* Error Toast Notification for adding post to album */}
      <ErrorToastNotification
        show={albumErrorShow}
        onClose={() => setAlbumErrorShow(false)}
        position="bottom-end"
        message="There was an error adding the post to your album!"
      />
    </Container>
  );
}

export default PostDetail;
