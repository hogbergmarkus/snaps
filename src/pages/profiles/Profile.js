import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { OwnerDropdown } from "../../components/OwnerDropdown";
import ImageAsset from "../../components/ImageAsset";
import styles from "../../styles/Profile.module.css";

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === profile?.owner;

  const navigate = useNavigate();

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

  const handleEdit = () => {
    navigate(`/profiles/${id}/edit`);
  };

  return (
    <>
      <Row>
        <Col>
          {/* Display profile image and owner */}
          {profile ? (
            <>
              <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} lg={8} className="d-flex justify-content-center">
                  <div className={styles.ProfileImage}>
                    <ImageAsset src={profile.image} />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="d-flex justify-content-center align-items-center">
                    {profile.username ? (
                      <h2>{profile.username}</h2>
                    ) : (
                      <h2>{profile.owner}</h2>
                    )}
                    {/* Display owner dropdown if the current user is the profile owner */}
                    {is_owner && (
                      <div className="d-flex justify-content-center align-items-center">
                        <OwnerDropdown
                          handleEdit={handleEdit}
                          handleDelete={() => {}}
                        />
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
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
                <p className={`${styles.BioText}`}>{profile.bio}</p>
              </div>
            </>
          ) : null}
        </Col>
      </Row>
    </>
  );
}

export default Profile;
