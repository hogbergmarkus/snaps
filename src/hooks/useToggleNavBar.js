import { useState } from "react";

const useToggleNavBar = () => {
  // State to control the offcanvas menu
  const [show, setShow] = useState(false);

  // Functions to toggle the navbar offcanvas show/hide
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return { show, handleShow, handleClose };
};

export default useToggleNavBar;
