import React from "react";
import PropTypes from "prop-types";
import { Collapse, Spin } from "antd";
import moment from "moment";
import { useQuery } from "react-query";
import memberApi from "../api/memberApi";
import HistoryItem from "./HistoryItem";

CollapseSecond.propTypes = {
  idRace: PropTypes.number,
};

CollapseSecond.defaultProps = {
  idRace: null,
};

function CollapseSecond({ idRace }) {
  const { data, isLoading } = useQuery(
    ["list-history", idRace],
    async () => {
      const { data } = await memberApi.getListHistory(idRace);
      return data?.items;
    },
    {
      enabled: !!idRace,
    }
  );

  return (
    <Collapse accordion className="history-collapse" expandIconPosition="right">
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
        data?.map((item) => (
          <Collapse.Panel
            header={
              <div className="history-collapse__title">
                Ngày {moment(item?.created_at).format("DD/MM/YYYY")}{" "}
              </div>
            }
            key={`history-${item?.new_me_health_id}`}
          >
            <HistoryItem id={item?.new_me_health_id} />
          </Collapse.Panel>
        ))}
    </Collapse>
  );
}

export default CollapseSecond;
