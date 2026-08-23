import React from "react";
import LeftSvg from "../../assets/left-arrow.svg";
const LeftNavigationButton = ({ className }) => {
  return (
    <img
      src={LeftSvg}
      alt="left navigation button"
      width={40}
      className={className}
    />
  );
};

export default LeftNavigationButton;
