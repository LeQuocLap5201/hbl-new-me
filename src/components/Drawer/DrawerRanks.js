import React from "react";
import PropTypes from "prop-types";
import { Drawer, Tabs } from "antd";
import TabsNCC from "../ContentTabs/TabsNCC";
import TabsNCO from "../ContentTabs/TabsNCO";

DrawerRanks.propTypes = {
  isShow: PropTypes.bool,
  FnShow: PropTypes.func,
};

DrawerRanks.defaultProps = {
  isShow: false,
  FnShow: null,
};

function DrawerRanks({ isShow, FnShow }) {
  const closeDrawer = () => {
    if (!FnShow) {
      return;
    }
    return FnShow(false);
  };

  return (
    <Drawer
      className="drawer-update drawer-ranks"
      placement="bottom"
      onClose={closeDrawer}
      visible={isShow}
    >
      <div className="container ranks">
        <Tabs defaultActiveKey="1" className="ranks-tabs">
          <Tabs.TabPane tab="NCC" key="1">
            <TabsNCC />
          </Tabs.TabPane>
          <Tabs.TabPane tab="NCO" key="2">
            <TabsNCO />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Drawer>
  );
}

export default DrawerRanks;
