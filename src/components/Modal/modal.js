import React from "react";
import PropTypes from "prop-types";
import "./madal.css";

const Modal = ({ largeImgURL, closeModal }) => {
  return (
    <div onClick={closeModal} className="Overlay">
      <div className="Modal">
        <img src={largeImgURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImgURL: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
