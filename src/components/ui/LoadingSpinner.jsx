import React from "react";
import classNames from "classnames";

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const LoadingSpinner = ({ size = "md", color = "text-blue-600", center = false }) => {
  return (
    <div className={classNames(center && "flex justify-center items-center py-4")}>
      <svg
        className={classNames("animate-spin", sizeMap[size], color)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
