import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { OwnerDropdown } from "../../components/OwnerDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/AlbumCard.module.css";

function AlbumCard({ album, id, onDelete, onEdit }) {
  // State to control delete confirmation modal
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Function to handle deleting an album
  const handleDelete = async () => {
    if (showModal) {
      try {
        await axiosRes.delete(`/albums/${id}/`);
        onDelete(id);
      } catch (err) {
        console.log(err);
      }
    }
    handleCloseModal();
  };

  // Function to handle editing an album
  const handleEdit = () => {
    onEdit(album);
  };

  return (
    <Card className={`${styles.Card}`}>
      <Card.Body>
        <span className="d-flex">
          <Link to={`/albums/${id}`} className={`${styles.AlbumLink}`}>
            <i className="fa-solid fa-folder-open fa-2x"></i>
          </Link>
          <div className="flex-grow-1"></div>
          {/* Dropdown menu for album options */}
          <OwnerDropdown
            handleDelete={handleShowModal}
            handleEdit={handleEdit}
          />
        </span>
        <Card.Title className={`${styles.AlbumFont}`}>{album.title}</Card.Title>
      </Card.Body>

      {/* Modal for Delete Confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Album?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default AlbumCard;
