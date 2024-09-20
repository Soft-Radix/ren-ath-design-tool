import React from "react";
import { RotatingLines } from "react-loader-spinner";

const LoadingBars = ({ isOutlined }) => {
  return (
    <span className="loadingBars" style={{ display: "flex", marginRight: 5 }}>
      <RotatingLines
        strokeColor={isOutlined ? "currentColor" : "white"}
        strokeWidth="5"
        animationDuration="0.75"
        width="20"
      />
    </span>
  );
};

export default LoadingBars;
