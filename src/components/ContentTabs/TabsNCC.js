import React, { useState } from "react";
import TabsTitle from "../TabsTitle";
import TabsHead from "../TabsHead";
import RanksItem from "../RanksItem";
import { Pagination } from "antd";
import PropTypes from "prop-types";
import FilterRanks from "../FilterRanks";

TabsNCC.propTypes = {
  showModal: PropTypes.func,
};

TabsNCC.defaultProps = {
  showModal: null,
};

export default function TabsNCC({ showModal }) {
  // const handleShowModal = () => {
  //   if (!showModal) {
  //     return;
  //   }
  //   return showModal(true);
  // };

  // Data filter
  const [filter, setFilter] = useState({ race_id: 1, area_id: 3 });

  const filterChange = (val) => {
    setFilter({ ...val });
  };

  return (
    <div>
      <TabsTitle />
      <FilterRanks filterDefault={filter} onFilterChange={filterChange} />
      <TabsHead />
      <div className="list-ranks">
        <RanksItem rank={1} />
        <RanksItem rank={2} />
        <RanksItem rank={3} />
        <RanksItem />
        <RanksItem myRank />
      </div>
      {/* <Pagination className="tabs-pagination" defaultCurrent={1} total={100} /> */}
      {/* <Button
        type="primary"
        block
        style={{ marginTop: 20 }}
        onClick={handleShowModal}
      >
        Show Modal
      </Button> */}
      <p className="no-data">
        Bảng xếp hạng sẽ được cập nhật ngay khi có kết quả. Bạn quay lại sau
        nhé!
      </p>
    </div>
  );
}
