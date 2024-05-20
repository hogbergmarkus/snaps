import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}/`);
        setProfile(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [id]);

  return (
    <Row>
      <Col>
        {profile ? (
          <img src={profile.image} alt={`${profile.username}'s profile`} />
        ) : (
          <div>Loading...</div>
        )}
      </Col>
    </Row>
  );
}

export default Profile;
