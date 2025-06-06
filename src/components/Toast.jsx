// src/components/Toast.jsx
import { useEffect } from 'react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3초 후 자동 닫기
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
}
