import React from "react";
import PropTypes from "prop-types";
import "./imagegaleryitem.css";

const ImageGalleryItem = ({ webImgURL, largeImgURL, openModal }) => {
  return (
    <li onClick={() => openModal(largeImgURL)} className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={webImgURL}
        alt="img"
        target="_blank"
        rel="noreferrer noopener"
      />
    </li>
  );
};

//
ImageGalleryItem.propTypes = {
  webImgURL: PropTypes.string.isRequired,
  largeImgURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
