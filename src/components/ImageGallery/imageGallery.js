import React from "react";
import PropTypes from "prop-types";
import "./imagegallery.css";
import ImageGalleryItem from "../ImageGalleryItem/imageGalleryItem";

const ImageGallery = ({ items, openModal }) => (
  <ul className="ImageGallery">
    {items.map((item) => (
      <ImageGalleryItem
        key={item.id}
        webImgURL={item.webformatURL}
        largeImgURL={item.largeImageURL}
        openModal={openModal}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
