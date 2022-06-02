import { Pagination } from "antd";
import React from "react";
import RanksItem from "../RanksItem";
import TabsHead from "../TabsHead";
import TabsTitle from "../TabsTitle";

export default function TabsNCO() {
  return (
    <div>
      <TabsTitle />
      <TabsHead />
      <div className="list-ranks">
        <RanksItem rank={1} weight={5.6} />
        <RanksItem rank={2} weight={5.6} />
        <RanksItem rank={3} weight={5.6} />
        <RanksItem />
        <RanksItem myRank />
      </div>
      <Pagination className="tabs-pagination" defaultCurrent={1} total={100} />
    </div>
  );
}
