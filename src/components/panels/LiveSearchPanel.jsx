// 📁 경로: src/components/panels/LiveSearchPanel.jsx

import React, { useState } from "react";
import { fetchLiveProductStats } from "@/services/n8nService";

const LiveSearchPanel = () => {
  const [searching, setSearching] = useState(false);
  const [products, setProducts] = useState([]);

  const handleStart = async () => {
    setSearching(true);
    const stats = await fetchLiveProductStats();
    if (stats) setProducts(stats);
    setSearching(false);
  };

  return (
    <div className="text-sm space-y-4">
      <h3 className="text-lg font-bold">🧠 실시간 인기 · 수익률 검색</h3>

      <button
        onClick={handleStart}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        {searching ? "검색 중..." : "Start 검색"}
      </button>

      <ul className="space-y-1 text-sm">
        {products.map((p, i) => (
          <li key={i} className="border-b border-gray-700 py-1">
            <span className="font-medium">{p.name}</span> - 인기 {p.popularity}, 수익률 {p.profitRate}%
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-400 mt-4">
        ※ 판매량/이익률/회전율 기반 자동 분석됩니다.
      </p>
    </div>
  );
};

export default LiveSearchPanel;