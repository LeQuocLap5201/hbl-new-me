import React from "react";
import "./index.css";

export default function Info() {
  return (
    <>
      <h2 data-text="New me - Thách thức tôi">New me - Thách thức tôi</h2>
      <div
        className="info-img"
        style={{ backgroundImage: "url(/img/confetti.png)" }}
      >
        <img srcSet="/img/girl.png 2x" alt="girl" />
      </div>
    </>
  );
}
