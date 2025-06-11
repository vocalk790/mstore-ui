import React from "react";
import classNames from "classnames";

const Card = ({
  title,
  description,
  children,
  footer,
  className = "",
  shadow = true,
  bordered = false
}) => {
  return (
    <div
      className={classNames(
        "rounded-2xl bg-white p-6 transition-all duration-300",
        shadow && "shadow-md hover:shadow-lg",
        bordered && "border border-gray-200",
        className
      )}
    >
      {title && <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>}
      {description && <p className="text-gray-500 text-sm mb-4">{description}</p>}
      <div>{children}</div>
      {footer && <div className="mt-4 border-t pt-3 text-right">{footer}</div>}
    </div>
  );
};

export default Card;
