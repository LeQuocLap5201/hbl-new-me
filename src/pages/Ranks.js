import { Tabs } from "antd";
import React from "react";
import TabsNCC from "../components/ContentTabs/TabsNCC";
import TabsNCO from "../components/ContentTabs/TabsNCO";

export default function Ranks() {
  return (
    <div className="container">
      <Tabs defaultActiveKey="1" className="ranks-tabs">
        <Tabs.TabPane tab="NCC" key="1">
          <TabsNCC />
        </Tabs.TabPane>
        <Tabs.TabPane tab="NCO" key="2">
          <TabsNCO />
        </Tabs.TabPane>
        <Tabs.TabPane tab="TAB" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
