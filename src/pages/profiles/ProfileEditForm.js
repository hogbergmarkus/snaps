import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import ImageAsset from "../../components/ImageAsset";

function ProfileEditForm() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const [profileData, setProfileData] = useState({
    username: "",
    bio: "",
    image: "",
  });
  const { username, bio, image } = profileData;
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Ref to the image input to handle uploads
  const imageInput = useRef(null);

  // Fetch profile details when component mounts
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}/`);

        if (currentUser?.profile_id?.toString() === id) {
          const { username, bio, image } = data;
          setProfileData({ username, bio, image });
        } else {
          navigate("/");
        }
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    };

    // Check if currentUser is available before proceeding
    if (currentUser) {
      handleMount();
    }
  }, [currentUser, navigate, id]);

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      // Revoke previous image url
      URL.revokeObjectURL(image);
      setProfileData({
        ...profileData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // Handle form input changes
  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Create form data to send and append data
    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        image: data.image,
      }));
      navigate(`/profiles/${id}/`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {/* Username form input */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label visuallyHidden>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>

        {/* Textarea form input for bio */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="bio" className="mb-3">
              <Form.Label visuallyHidden>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Bio"
                name="bio"
                value={bio}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.bio?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>

        {/* Image upload */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label visuallyHidden>Profile Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>

        {/* Display preview image */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            {image && <ImageAsset src={image} />}
          </Col>
        </Row>

        {/* Submit button and Cancel button */}
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Button
              variant="secondary"
              className="mt-3"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="mt-3 ms-2">
              Save
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default ProfileEditForm;
