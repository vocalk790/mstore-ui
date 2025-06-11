// src/components/DashboardCards.jsx
import React from "react";

const DashboardCards = () => {
  const stats = [
    { label: "총 사용자", value: 1124 },
    { label: "오늘 가입", value: 27 },
    { label: "활성 사용자", value: 934 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center text-center"
        >
          <div className="text-2xl font-bold">{s.value.toLocaleString()}</div>
          <div className="text-sm text-gray-500 mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
