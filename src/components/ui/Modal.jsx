import React, { useEffect } from "react";
import classNames from "classnames";

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
      <div
        className={classNames(
          "w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 animate-fadeIn"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <div className="text-gray-700 mb-4">{children}</div>
        {footer && <div className="text-right pt-2 border-t">{footer}</div>}
      </div>

      {/* 바깥 영역 클릭 시 닫기 */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />
    </div>
  );
};

export default Modal;
