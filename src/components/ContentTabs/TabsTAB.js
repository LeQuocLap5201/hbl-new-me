import React, { useState } from "react";
import FilterRanks from "../FilterRanks";
import RanksItem from "../RanksItem";
import TabsHead from "../TabsHead";
import TabsTitle from "../TabsTitle";

export default function TabsTAB() {
  // Data filter
  const [filter, setFilter] = useState({ round_id: 2, area_id: 3 });

  const filterChange = (val) => {
    setFilter({ ...val });
  };

  return (
    <div>
      <TabsTitle />
      <FilterRanks
        isRound
        filterDefault={filter}
        onFilterChange={filterChange}
      />
      <TabsHead />
      <div className="list-ranks">
        <RanksItem rank={1} />
        <RanksItem rank={2} />
        <RanksItem rank={3} />
        <RanksItem />
        <RanksItem myRank />
      </div>
    </div>
  );
}
