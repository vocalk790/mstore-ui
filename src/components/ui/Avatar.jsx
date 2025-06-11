import React from "react";
import classNames from "classnames";

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-lg",
};

const Avatar = ({ src, alt, name, size = "md", rounded = true }) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div
      className={classNames(
        "flex items-center justify-center bg-gray-200 text-gray-700 font-semibold",
        sizeClasses[size],
        rounded ? "rounded-full" : "rounded-md"
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name}
          className={classNames("object-cover", "w-full h-full", rounded ? "rounded-full" : "rounded-md")}
          onError={(e) => (e.target.style.display = "none")}
        />
      ) : (
        initials
      )}
    </div>
  );
};

export default Avatar;
