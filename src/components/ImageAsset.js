import React from "react";
import styles from "../styles/ImageAsset.module.css";

// Component to display image asset, src is the URL of the image
const ImageAsset = ({ src }) => {
  return (
    <div className={styles.container}>{src && <img src={src} alt="" />}</div>
  );
};

export default ImageAsset;
