import { Button, Modal, Space, Tabs } from "antd";
import React, { useState } from "react";
import TabsNCC from "../components/ContentTabs/TabsNCC";
import TabsNCO from "../components/ContentTabs/TabsNCO";
import Info from "../components/Info";

export default function Ranks() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModal = (val) => {
    setIsModalVisible(val);
  };

  return (
    <div className="container">
      <Tabs defaultActiveKey="1" className="ranks-tabs">
        <Tabs.TabPane tab="NCC" key="1">
          <TabsNCC showModal={handleModal} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="NCO" key="2">
          <TabsNCO />
        </Tabs.TabPane>
        <Tabs.TabPane tab="TAB" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>

      <Info />
      <p className="event-end">CHƯƠNG TRÌNH ĐÃ KẾT THÚC. </p>

      <Modal
        className="tabs-modal"
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        width="calc(100% - 40px)"
        footer={null}
      >
        <p>
          Bảng xếp hạng sẽ được cập nhật ngay khi có kết quả. Bạn quay lại sau
          nhé!
        </p>
        <Space style={{ width: "100%", justifyContent: "flex-end" }}>
          <Button className="btn-bg">Đồng ý</Button>
        </Space>
      </Modal>
    </div>
  );
}
