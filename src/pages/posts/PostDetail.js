import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

function PostDetail() {
  // Access id of post in the url
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch post details when component mounts
  useEffect(() => {
    const handleMount = async () => {
      setLoading(true);
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setPost({ results: [post] });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error: Unable to get post.");
        setLoading(false);
      }
    };

    handleMount();
  }, [id]);

  return (
    <div>
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
    </div>
  );
}

export default PostDetail;
