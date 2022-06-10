import React from "react";
import PropTypes from "prop-types";
import "./index.css";

RanksItem.propTypes = {
  rank: PropTypes.number,
  name: PropTypes.string,
  weight: PropTypes.number,
  myRank: PropTypes.bool,
};

RanksItem.defaultProps = {
  rank: 4,
  name: "Nguyễn Văn A",
  weight: 4.5,
  myRank: false,
};

const listTop = [1, 2, 3];

function RanksItem({ rank, name, weight, myRank }) {
  if (myRank) {
    return (
      <div className="myRank">
        <span className="myRank__rank">{rank}</span>
        <span className="myRank__name">{name}</span>
        {/* <span className="myRank__weight">{weight} kg</span> */}
      </div>
    );
  }

  return (
    <div className="ranks-item">
      <div
        className="ranks-item__rank"
        style={{ background: listTop.includes(rank) ? "#f8a629" : "#52c41a" }}
      >
        {rank}
      </div>
      <div className="ranks-item__content">
        <span className="ranks-item__name">{name}</span>
        {/* <span className="ranks-item__weight">{weight} kg</span> */}
      </div>
    </div>
  );
}

export default RanksItem;
