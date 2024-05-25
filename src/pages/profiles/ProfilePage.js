import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import PostsFeed from "../posts/PostsFeed";
import Profile from "./Profile";
import SuccessToastNotification from "../../components/SuccessToastNotification";

const ProfilePage = () => {
  const { id } = useParams();

  const [toastShow, setToastShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("showPostDeleteToast") === "true") {
      setToastShow(true);
      localStorage.removeItem("showPostDeleteToast");
    }
  }, []);

  return (
    <Container className="p-3">
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

      {/* Success Toast Notification on Post delete */}
      <SuccessToastNotification
        show={toastShow}
        onClose={() => setToastShow(false)}
        position="bottom-end"
        message="Post deleted!"
      />
    </Container>
  );
};

export default ProfilePage;
