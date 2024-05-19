import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

function AlbumDetail() {
  return (
    <Container>
      <Row className="justify-content-center my-4">
        <Col xs={12} lg={8} className="text-center">
          <Alert variant="info">
            <span>No posts in this album yet</span>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default AlbumDetail;
