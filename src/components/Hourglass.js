import React from "react";
import Lottie from "lottie-react";
import HourglassSvg from "../lotties/hourglass.json";

export default function Hourglass() {
  return (
    <Lottie
      animationData={HourglassSvg}
      autoPlay={true}
      loop={true}
        style={{ height: 50 }}
    />
  );
}
