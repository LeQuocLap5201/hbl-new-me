/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PropTypes from "prop-types";
import { Collapse, Drawer, Spin } from "antd";
import HistoryItem from "../HistoryItem";
import { useQuery } from "react-query";
import memberApi from "../../api/memberApi";
import moment from "moment";

DrawerHistory.propTypes = {
  isShow: PropTypes.bool,
  FnShow: PropTypes.func,
};

DrawerHistory.defaultProps = {
  isShow: false,
  FnShow: null,
};

function DrawerHistory({ isShow, FnShow }) {
  const closeDrawer = () => {
    if (!FnShow) {
      return;
    }
    return FnShow(false);
  };

  const { data, isLoading } = useQuery(
    "list-history",
    memberApi.getListHistory,
    {
      enabled: isShow,
    }
  );

  return (
    <Drawer
      className="drawer-update drawer-history"
      title="Lịch sử cập nhật"
      placement="bottom"
      onClose={closeDrawer}
      visible={isShow}
    >
      <Collapse
        accordion
        className="history-collapse"
        expandIconPosition="right"
      >
        {isLoading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              margin: "20px 0",
            }}
          >
            <Spin />
          </div>
        )}
        {data?.data?.data?.length === 0 && (
          <p style={{ textAlign: "center", fontSize: 18 }}>Trống</p>
        )}

        {data?.data?.data?.length !== 0 &&
          data?.data?.data?.map((item) => (
            <Collapse.Panel
              header={
                <div className="history-collapse__title">
                  Ngày {moment(item?.created_at).format("DD/MM/YYYY")}{" "}
                </div>
              }
              key={item?.new_me_health_id}
            >
              <HistoryItem id={item?.new_me_health_id} />
            </Collapse.Panel>
          ))}
      </Collapse>
    </Drawer>
  );
}

export default DrawerHistory;
