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
import styles from "../../styles/PostDetail.module.css";

function PostDetail() {
  // Access id of post in the url
  const { id } = useParams();

  const [post, setPost] = useState({ results: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [albums, setAlbums] = useState({ results: [] });
  const [selectedAlbum, setSelectedAlbum] = useState("");

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

      // Clear selected album input
      setSelectedAlbum("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mb-5">
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
                  <option value="">Choose an Album...</option>
                  {albums.results.map((album) => (
                    <option key={album.id} value={album.id}>
                      {album.title}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-2">
                Save to Album
              </Button>
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
    </Container>
  );
}

export default PostDetail;
