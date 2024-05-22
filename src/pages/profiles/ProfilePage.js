import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import PostsFeed from "../posts/PostsFeed";
import Profile from "./Profile";

const ProfilePage = () => {
  const { id } = useParams();

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Profile />
        </Col>
      </Row>
      <Row>
        <Col>
          <PostsFeed
            filter={`owner__profile__id=${id}&`}
            message="You have not added any posts yet."
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
