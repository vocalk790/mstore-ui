// 📁 경로: src/components/panels/ConnectedMarketsPanel.jsx

import React from "react";

const ConnectedMarketsPanel = () => {
  const connectedMarkets = [
    { name: "Amazon", status: "✅ 연동 완료" },
    { name: "eBay", status: "✅ 연동 완료" },
    { name: "Coupang", status: "✅ 연동 완료" },
    { name: "AliExpress", status: "✅ 연동 완료" },
    { name: "Shopee", status: "🟡 연동 준비 중" },
    { name: "Walmart", status: "🟡 연동 준비 중" },
  ];

  return (
    <div className="text-sm space-y-2">
      <h3 className="text-lg font-bold mb-2">🌍 연동된 글로벌 마켓 현황</h3>
      <ul className="divide-y divide-gray-700">
        {connectedMarkets.map((market) => (
          <li key={market.name} className="py-2 flex justify-between">
            <span>{market.name}</span>
            <span>{market.status}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-gray-400">※ 연동 상태는 자동으로 갱신됩니다.</p>
    </div>
  );
};

export default ConnectedMarketsPanel;
