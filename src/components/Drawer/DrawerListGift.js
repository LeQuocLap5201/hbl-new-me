import React, { useState } from "react";
import PropTypes from "prop-types";
import { Collapse, Drawer, Modal } from "antd";

DrawerListGift.propTypes = {
  isShow: PropTypes.bool,
  FnShow: PropTypes.func,
};

DrawerListGift.defaultProps = {
  isShow: false,
  FnShow: null,
};

function DrawerListGift({ isShow, FnShow }) {
  const [visible, setVisible] = useState(false);
  const [dataGift, setDataGift] = useState("");

  const closeDrawer = () => {
    if (!FnShow) {
      return;
    }
    return FnShow(false);
  };

  const showModalGift = (data) => {
    setDataGift(data);
    setVisible(true);
  };

  return (
    <>
      <Drawer
        className="drawer-update drawer-history drawer-list-gift"
        title="Quà của tôi"
        placement="bottom"
        onClose={closeDrawer}
        visible={isShow}
      >
        <Collapse
          accordion
          style={{ border: "none", background: "transparent" }}
        >
          <Collapse.Panel
            className="collapse-panel__primary"
            header="Chặng 1: 01/07/2022 - 10/07/2022"
            showArrow={false}
          >
            <div
              className="gift-item"
              onClick={() => showModalGift("/img/hbl-tea1.png")}
            >
              Trà thảo mộc cô đặc
            </div>
            <div
              className="gift-item"
              onClick={() => showModalGift("/img/cer.png")}
            >
              Giấy chứng nhận
            </div>
          </Collapse.Panel>
          <Collapse.Panel
            className="collapse-panel__primary"
            header="Chặng 2: 01/07/2022 - 10/07/2022"
            showArrow={false}
          >
            <div className="gift-item">Trà thảo mộc cô đặc</div>
            <div className="gift-item">Giấy chứng nhận</div>
          </Collapse.Panel>
        </Collapse>
      </Drawer>
      <Modal
      className="modal-gift"
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
      >
        <img
          style={{ width: "100%" }}
          src={dataGift}
          alt="gift"
          onClick={() => {
            setVisible(false);
          }}
        />
      </Modal>
    </>
  );
}

export default DrawerListGift;
