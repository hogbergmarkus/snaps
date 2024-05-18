import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import AlbumCreateForm from "./AlbumCreateForm";
import AlbumCard from "./AlbumCard";
import { axiosReq } from "../../api/axiosDefaults";

function Albums() {
  const [albums, setAlbums] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all albums
  useEffect(() => {
    const fetchAlbums = async () => {
      let allAlbums = [];
      let url = "/albums/";
      try {
        // While paginated data exists fetch next page
        while (url) {
          const { data } = await axiosReq.get(url);
          // Add results to allAlbums array
          allAlbums = [...allAlbums, ...data.results];
          // Set next page url, returns null if no more pages
          url = data.next;
        }
        setAlbums({ results: allAlbums });
        setHasLoaded(true);
      } catch (err) {
        setError("Unable to get albums.");
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
      <Row className="justify-content-center m-4">
        {/* Display loading animation until data is loaded */}
        {!hasLoaded ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="grow" />
          </div>
        ) : error ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Alert variant="danger">{error}</Alert>
          </div>
        ) : albums.results && albums.results.length > 0 ? (
          <>
            {/* Display albums */}
            {albums.results.map((album) => (
              <Col key={album.id} xs={12} sm={6} md={4}>
                <AlbumCard album={album} />
              </Col>
            ))}
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Alert variant="info">No albums found</Alert>
          </div>
        )}
      </Row>
    </Container>
  );
}

export default Albums;
