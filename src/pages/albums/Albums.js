import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AlbumCreateForm from "./AlbumCreateForm";
import AlbumCard from "./AlbumCard";
import { axiosReq } from "../../api/axiosDefaults";
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
            <Col key={album.id} xs={12} sm={6} md={4}>
              <AlbumCard album={album} />
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
