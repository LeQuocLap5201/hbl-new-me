import React from "react";
import TabsTitle from "../TabsTitle";
import TabsHead from "../TabsHead";
import RanksItem from "../RanksItem";
import { Pagination } from "antd";

export default function TabsNCC() {
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
    </div>
  );
}
