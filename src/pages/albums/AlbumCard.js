import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { OwnerDropdown } from "../../components/OwnerDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/AlbumCard.module.css";

function AlbumCard({ album, id, onDelete }) {
  // Function to handle deleting an album
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/albums/${id}/`);
      onDelete(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={`${styles.Card}`}>
      <Card.Body>
        <span className="d-flex">
          <Link to={`/albums/${id}`} className={`${styles.AlbumLink}`}>
            <i className="fa-solid fa-folder-open fa-2x"></i>
          </Link>
          <div className="flex-grow-1"></div>
          <OwnerDropdown handleDelete={handleDelete} />
        </span>
        <Card.Title>{album.title}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default AlbumCard;
