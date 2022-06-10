import React from "react";
import PropTypes from "prop-types";
import "./index.css";

Certificate.propTypes = {
  urlImg: PropTypes.string,
};

Certificate.defaultProps = {
  urlImg: "/img/cer.png",
};

function Certificate({ urlImg }) {
  return (
    <div className="certificate">
      <img src={urlImg} alt="certificate" />
    </div>
  );
}

export default Certificate;
