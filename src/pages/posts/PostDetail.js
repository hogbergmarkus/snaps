import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function PostDetail() {
  // Access id of post in the url
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  // Fetch post details when component mounts
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setPost({ results: [post] });
        console.log(post);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Container>
      {/* Image title goes here */}
      <Row className="justify-content-center">
        <Col xs={6} md={6} lg={4}>
          <p>Title here</p>
        </Col>
        <Col xs={6} md={6} lg={4}>
          <p className="text-end">Avatar here</p>
        </Col>
      </Row>

      {/* Display post image here */}
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={8}>
          <p className="text-center">Image goes here</p>
        </Col>
      </Row>

      {/* Display Content here */}
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={8}>
          <p className="text-center">This is the content</p>
        </Col>
      </Row>
    </Container>
  );
}

export default PostDetail;
