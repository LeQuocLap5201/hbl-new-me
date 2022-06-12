/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Drawer, Form } from "antd";
import FormHeal from "../FormHeal";
import { useQuery } from "react-query";
import memberApi from "../../api/memberApi";

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
  const [isUpdate, setIsUpdate] = useState(true);

  const closeDrawer = () => {
    if (!FnShow) {
      return;
    }
    return FnShow(false);
  };

  useQuery("race-detail", memberApi.getRaceDetail, {
    onSuccess: () => {
      setIsUpdate(true);
    },
    onError: (error) => {
      if (error?.response?.data?.statusCode === 404) {
        setIsUpdate(false);
      }
    },
    enabled: isShow,
  });

  return (
    <Drawer
      className="drawer-update"
      title="Cập nhật hoạt động"
      placement="bottom"
      onClose={closeDrawer}
      visible={isShow}
    >
      {isUpdate ? (
        <FormHeal FnShow={closeDrawer} form={form} />
      ) : (
        <p className="no-data">Bạn chưa thể thêm được hoạt động</p>
      )}
    </Drawer>
  );
}

export default DrawerUpdate;
