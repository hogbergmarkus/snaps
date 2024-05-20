import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import PostsFeed from "../posts/PostsFeed";

const ProfilePage = () => {
  const { id } = useParams();

  return (
    <Container>
      <Row>
        <Col>
          <PostsFeed filter={`owner__profile__id=${id}&`} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
