import React from "react";
import styles from "../styles/ImageAsset.module.css";

const ImageAsset = ({ src }) => {
  return <div className={styles.container}>{src && <img src={src} alt="" />}</div>;
};

export default ImageAsset;
