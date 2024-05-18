import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function AlbumCard({ album }) {
  return (
    <Card as={Link} to={`/albums/${album.id}`}>
      <Card.Body>
        <i className="fa-solid fa-folder-open fa-2x"></i>
        <Card.Title>{album.title}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default AlbumCard;
