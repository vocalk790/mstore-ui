import React from "react";
import classNames from "classnames";

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error = "",
  disabled = false,
  icon,
  name,
  fullWidth = true
}) => {
  const baseStyle =
    "block w-full rounded-xl border px-4 py-2 text-base shadow-sm transition-all duration-150 focus:outline-none focus:ring-2";

  const errorStyle =
    "border-red-500 focus:ring-red-500";

  const normalStyle =
    "border-gray-300 focus:ring-blue-500";

  const disabledStyle =
    "bg-gray-100 cursor-not-allowed opacity-50";

  return (
    <div className={classNames("flex flex-col space-y-1", fullWidth && "w-full")}>
      {label && <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={classNames(
            baseStyle,
            error ? errorStyle : normalStyle,
            disabled && disabledStyle,
            icon && "pl-10"
          )}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
