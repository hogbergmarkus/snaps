import React from "react";
import Accordion from "react-bootstrap/Accordion";
import styles from "../styles/DropdownInfo.module.css";

function DropdownInfo({ accordionMessage }) {
  return (
    <Accordion flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Click me to read about Albums</Accordion.Header>
        <Accordion.Body>
          <p className={`${styles.AlbumsDescription}`}>{accordionMessage}</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default DropdownInfo;
