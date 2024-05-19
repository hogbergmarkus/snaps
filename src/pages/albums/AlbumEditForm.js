import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/AlbumEditForm.module.css";

function AlbumEditForm({ album, setIsEditing, setAlbums }) {
  const [formData, setFormData] = useState({ title: album.title });

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Close the edit form when the user cancels
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.put(`/albums/${album.id}/`, formData);
      // Update the state with the new album data
      setAlbums((prevAlbums) => ({
        ...prevAlbums,
        // Map over results and replace the old album with the new one
        results: prevAlbums.results.map((album) => {
          // Replace the old album data with the new one if id matches
          return album.id === data.id ? data : album;
        }),
      }));

      // Close the edit form
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <span className="text-center">
        <h4>Edit name of album here</h4>
      </span>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col xs={12} lg={8}>
            <Form.Group controlId="title">
              <Form.Label visuallyHidden>Album title</Form.Label>
              <Form.Control
                className={`${styles.FormFont}`}
                type="text"
                placeholder={album.title}
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {/* Display error message */}
                <p>Something went wrong</p>
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={12} lg={8}>
            <Button
              variant="primary"
              type="submit"
              className={`${styles.Button}`}
            >
              Save
            </Button>

            <Button
              variant="secondary"
              type="submit"
              className={`${styles.Button}`}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default AlbumEditForm;
