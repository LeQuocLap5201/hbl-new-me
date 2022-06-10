/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PropTypes from "prop-types";
import { Drawer, Form } from "antd";
import FormHeal from "../FormHeal";

DrawerUpdate.propTypes = {
  isShow: PropTypes.bool,
  FnShow: PropTypes.func,
};

DrawerUpdate.defaultProps = {
  isShow: false,
  FnShow: null,
};

function DrawerUpdate({ isShow, FnShow }) {
  const [form] = Form.useForm();

  const closeDrawer = () => {
    if (!FnShow) {
      return;
    }
    return FnShow(false);
  };

  return (
    <Drawer
      className="drawer-update"
      title="Cập nhật hoạt động"
      placement="bottom"
      onClose={closeDrawer}
      visible={isShow}
    >
      <FormHeal FnShow={closeDrawer} form={form} />
    </Drawer>
  );
}

export default DrawerUpdate;
