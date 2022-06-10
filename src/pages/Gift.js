import React from "react";
import Lottie from "lottie-react";
import Confeti from "../lotties/confeti.json";
import Certificate from "../components/Certificate";

export default function Gift() {
  return (
    <div className="container gift">
      <p className="white">CHÚC MỪNG BẠN ĐÃ THAM GIA</p>
      <div className="gift-content">
        <Lottie
          className="gift-svg"
          animationData={Confeti}
          autoPlay={true}
          loop={true}
          style={{ height: 400 }}
        />
        <div className="gift-detail">
          <img srcSet="/img/hbl-tea1.png 2x" alt="" />
        </div>
      </div>
      <p className="green">
        Herbalife tặng bạn một Phần Quà và Giấy Chứng Nhận
      </p>
      <Certificate />
    </div>
  );
}
