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
    <>
      <Row>
        <Col>
          {/* Display profile image and owner */}
          {profile ? (
            <>
              <div className="d-flex justify-content-center align-items-center">
                <img src={profile.image} alt={`${profile.owner}'s profile`} />
              </div>
              <div className="d-flex justify-content-center align-items-center">
                {profile.username ? (
                  <h2>{profile.username}</h2>
                ) : (
                  <h2>{profile.owner}</h2>
                )}
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Display profile bio if they have written one */}
          {profile ? (
            <>
              <div className="d-flex justify-content-center align-items-center">
                <p>{profile.bio}</p>
              </div>
            </>
          ) : null}
        </Col>
      </Row>
    </>
  );
}

export default Profile;
