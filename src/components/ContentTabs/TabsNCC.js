import React from "react";
import TabsTitle from "../TabsTitle";
import TabsHead from "../TabsHead";
import RanksItem from "../RanksItem";
import { Button, Pagination } from "antd";
import PropTypes from "prop-types";

TabsNCC.propTypes = {
  showModal: PropTypes.func,
};

TabsNCC.defaultProps = {
  showModal: null,
};

export default function TabsNCC({ showModal }) {
  const handleShowModal = () => {
    if (!showModal) {
      return;
    }
    return showModal(true);
  };

  return (
    <div>
      <TabsTitle />
      <TabsHead />
      <div className="list-ranks">
        <RanksItem rank={1} />
        <RanksItem rank={2} />
        <RanksItem rank={3} />
        <RanksItem />
        <RanksItem myRank />
      </div>
      <Pagination className="tabs-pagination" defaultCurrent={1} total={100} />
      <Button
        type="primary"
        block
        style={{ marginTop: 20 }}
        onClick={handleShowModal}
      >
        Show Modal
      </Button>
    </div>
  );
}
