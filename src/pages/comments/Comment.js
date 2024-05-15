import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from "../../components/Avatar";

const Comment = (props) => {
  const { profile_id, profile_image, owner, updated_at, content } = props;
  return (
    <Card className="mt-3 mb-1">
      <Row className="d-flex">
        <Col className="d-flex align-items-center mt-2">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={30} />
          </Link>
          <span className="ms-2">{owner}</span>
          <div className="flex-grow-1"></div>
          <span className="text-muted me-2">{updated_at}</span>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <p className="ms-2">{content}</p>
        </Col>
      </Row>
    </Card>
  );
};

export default Comment;
