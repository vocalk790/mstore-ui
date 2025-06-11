import React from "react";
import classNames from "classnames";

const colorStyles = {
  primary: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
  gray: "bg-gray-100 text-gray-800",
};

const sizeStyles = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
};

const Badge = ({
  children,
  color = "gray",   // primary, success, warning, error, gray
  size = "md",       // sm, md
  rounded = true,
  icon = null,
  className = ""
}) => {
  return (
    <span
      className={classNames(
        "inline-flex items-center font-medium",
        colorStyles[color],
        sizeStyles[size],
        rounded ? "rounded-full" : "rounded-md",
        className
      )}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
