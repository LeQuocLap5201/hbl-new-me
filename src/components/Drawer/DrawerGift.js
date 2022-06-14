import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "antd";
import Lottie from "lottie-react";
import Confeti from "../../lotties/confetti.json";
import Certificate from "../Certificate";

DrawerGift.propTypes = {
  isShow: PropTypes.bool,
  FnShow: PropTypes.func,
  dataGift: PropTypes.object,
};

DrawerGift.defaultProps = {
  isShow: false,
  FnShow: null,
  dataGift: {
    new_certificates: [],
    new_gifts: [],
  },
};

function DrawerGift({ isShow, FnShow, dataGift }) {
  const closeDrawer = () => {
    if (!FnShow) {
      return;
    }
    return FnShow(false);
  };

  return (
    <Drawer
      className="drawer-update drawer-gift"
      placement="bottom"
      onClose={closeDrawer}
      visible={isShow}
    >
      <div className="container gift">
        <p className="white">CHÚC MỪNG BẠN ĐÃ THAM GIA</p>

        {dataGift?.new_gifts?.length !== 0 && (
          <div className="gift-content">
            <Lottie
              className="gift-svg"
              animationData={Confeti}
              autoPlay={true}
              loop={true}
              style={{ height: 300 }}
            />
            <div className="gift-detail">
              <img srcSet="/img/hbl-tea1.png 2x" alt="" />
            </div>
          </div>
        )}

        {dataGift?.new_gifts?.length !== 0 &&
          dataGift?.new_certificates?.length === 0 && (
            <p className="green">Herbalife tặng bạn một Phần Quà</p>
          )}

        {dataGift?.new_certificates?.length !== 0 &&
          dataGift?.new_gifts?.length !== 0 && (
            <p className="green">
              Herbalife tặng bạn một Phần Quà và Giấy Chứng Nhận
            </p>
          )}

        {dataGift?.new_certificates?.length !== 0 && (
          <div
            style={{ marginTop: dataGift?.new_gifts?.length === 0 ? 25 : 0 }}
          >
            <Certificate />
          </div>
        )}

        {dataGift?.new_certificates?.length !== 0 &&
          dataGift?.new_gifts?.length === 0 && (
            <p className="green" style={{ transform: "none" }}>
              Herbalife tặng bạn một Giấy Chứng Nhận
            </p>
          )}
      </div>
    </Drawer>
  );
}

export default DrawerGift;
