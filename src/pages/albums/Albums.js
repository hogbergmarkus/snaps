import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AlbumCreateForm from "./AlbumCreateForm";

function Albums() {
  return (
    <Container>
      <Row className="justify-content-center me-5">
        <Col xs={12} lg={8}>
          <AlbumCreateForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Albums;
