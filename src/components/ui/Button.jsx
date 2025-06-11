import React from "react";
import classNames from "classnames";

const Button = ({
  children,
  variant = "primary", // primary, outline, ghost
  size = "md",         // sm, md, lg
  loading = false,
  disabled = false,
  onClick,
  icon,
  fullWidth = false,
  type = "button"
}) => {
  const baseStyle =
    "inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-100 focus:ring-blue-500",
  };

  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-3",
  };

  const disabledStyle = "opacity-50 cursor-not-allowed";

  const composedClass = classNames(
    baseStyle,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    (disabled || loading) && disabledStyle
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={composedClass}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        icon && <span className="mr-2">{icon}</span>
      )}
      {children}
    </button>
  );
};

export default Button;
