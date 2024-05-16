import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import AlbumCreateForm from "./AlbumCreateForm";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

function Albums() {
  const [albums, setAlbums] = useState([]);

  // Fetch all albums
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const { data } = await axiosReq.get("/albums/");
        // Update state with fetched data
        setAlbums(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAlbums();
  }, []);

  return (
    <Container>
      {/* Form for creating new albums */}
      <Row className="justify-content-center me-5">
        <Col xs={12} lg={8}>
          <AlbumCreateForm />
        </Col>
      </Row>
      {/* Display albums */}
      <Row className="justify-content-center m-4">
        {albums.results && albums.results.length > 0 ? (
          albums.results.map((album) => (
            <Col key={album.id} xs={6} md={4} lg={2}>
              <Card as={Link} to={`/albums/${album.id}`}>
                <Card.Body>
                  <i className="fa-solid fa-folder-open fa-2x"></i>
                  <Card.Title>{album.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Alert className="variant-info">No albums found</Alert>
          </div>
        )}
      </Row>
    </Container>
  );
}

export default Albums;
