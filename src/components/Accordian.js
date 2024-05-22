import Accordion from "react-bootstrap/Accordion";
import styles from "../styles/Accordian.module.css";

function Accordian() {
  return (
    <Accordion flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Click me to read about Albums</Accordion.Header>
        <Accordion.Body>
          <p className={`${styles.AlbumsDescription}`}>
            Add a new album by filling out the form below. When you come across
            a post you want to save, select an album and click the "Save to
            Album" button.
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Accordian;
