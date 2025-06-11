import React from "react";
import classNames from "classnames";
import { X } from "lucide-react"; // 아이콘 라이브러리 (lucide-react 사용)

const variants = {
  info: {
    bg: "bg-blue-50",
    text: "text-blue-800",
    icon: "ℹ️",
  },
  success: {
    bg: "bg-green-50",
    text: "text-green-800",
    icon: "✅",
  },
  warning: {
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    icon: "⚠️",
  },
  error: {
    bg: "bg-red-50",
    text: "text-red-800",
    icon: "❌",
  },
};

const Alert = ({ type = "info", message, onClose }) => {
  const variant = variants[type] || variants.info;

  return (
    <div
      className={classNames(
        "flex items-start gap-3 rounded-xl px-4 py-3 shadow-sm",
        variant.bg,
        variant.text
      )}
    >
      <div className="text-xl">{variant.icon}</div>
      <div className="flex-1 text-sm">{message}</div>
      {onClose && (
        <button onClick={onClose} className="text-inherit hover:opacity-70 mt-0.5">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
