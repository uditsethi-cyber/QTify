import React from "react";
import RightSvg from "../../assets/right-arrow.svg";
const RightNavigationButton = ({ className }) => {
  return (
    <img
      src={RightSvg}
      alt="right navigation button"
      width={40}
      className={className}
    />
  );
};

export default RightNavigationButton;
