import React from "react";
import PropTypes from "prop-types";
import "./button.css";

const Button = ({ onClick }) => {
  return (
    <div className="div">
      <button className="Button" type="button" onClick={onClick}>
        loade more
      </button>
    </div>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
