import React from "react";
import PropTypes from "prop-types";
import "./index.css";

Info.propTypes = {
  isEventEnd: PropTypes.bool,
};

Info.defaultProps = {
  isEventEnd: false,
};

export default function Info({ isEventEnd }) {
  return (
    <>
      <h2 data-text="New me - Thách thức tôi">New me - Thách thức tôi</h2>
      <div
        className="info-img"
        style={{ backgroundImage: "url(/img/confetti.png)" }}
      >
        <img srcSet="/img/girl.png 2x" alt="girl" />
      </div>
      {isEventEnd && <p className="event-end">CHƯƠNG TRÌNH ĐÃ KẾT THÚC. </p>}
    </>
  );
}
