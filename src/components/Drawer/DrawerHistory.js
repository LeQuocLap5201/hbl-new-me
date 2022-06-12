/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PropTypes from "prop-types";
import { Collapse, Drawer, Spin } from "antd";
import { useQuery } from "react-query";
import memberApi from "../../api/memberApi";
import moment from "moment";
import CollapseSecond from "../CollapseSecond";

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

  const { data, isLoading } = useQuery("list-race", memberApi.getListRace, {
    enabled: isShow,
    select: (data) => data.data?.items,
  });

  return (
    <Drawer
      className="drawer-update drawer-history"
      title="Lịch sử cập nhật"
      placement="bottom"
      onClose={closeDrawer}
      visible={isShow}
    >
      <Collapse accordion style={{ border: "none", background: "transparent" }}>
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

        {data?.length === 0 && (
          <p style={{ textAlign: "center", fontSize: 18 }}>Trống</p>
        )}

        {data?.length !== 0 &&
          data?.map((obj) => (
            <Collapse.Panel
              className="collapse-panel__primary"
              header={
                <>
                  <p
                    style={{ fontWeight: 700, letterSpacing: 1 }}
                  >{`${obj?.title}`}</p>
                  <p>{`${moment(obj?.created_at).format(
                    "DD/MM/YYYY"
                  )} - ${moment(obj?.ended_at).format("DD/MM/YYYY")}`}</p>
                </>
              }
              showArrow={false}
              key={`history-race-${obj?.race_id}`}
            >
              <CollapseSecond idRace={obj?.race_id} />
            </Collapse.Panel>
          ))}
      </Collapse>
    </Drawer>
  );
}

export default DrawerHistory;
