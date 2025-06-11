// 📁 경로: src/components/panels/DropShippingPanel.jsx

import React from "react";

const DropShippingPanel = () => {
  return (
    <div className="text-sm space-y-3">
      <h3 className="text-lg font-bold mb-2">📦 드랍쉬핑 설정</h3>

      <div>
        <label className="block mb-1 font-semibold">공급처 선택</label>
        <select className="w-full p-2 rounded bg-gray-800 border border-gray-600">
          <option>AliExpress</option>
          <option>1688</option>
          <option>Amazon</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">목표 마진 (%)</label>
        <input type="number" className="w-full p-2 rounded bg-gray-800 border border-gray-600" placeholder="예: 20" />
      </div>

      <div>
        <label className="block mb-1 font-semibold">자동 발주 조건</label>
        <select className="w-full p-2 rounded bg-gray-800 border border-gray-600">
          <option>판매 발생 시 자동 주문</option>
          <option>수동 확인 후 발주</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">정산 방식</label>
        <select className="w-full p-2 rounded bg-gray-800 border border-gray-600">
          <option>건별 정산</option>
          <option>주 1회 정산</option>
          <option>월 1회 정산</option>
        </select>
      </div>

      <p className="text-gray-400 mt-4">※ 리스크 자동 회피 정책이 적용됩니다. (매진, 반품, 가격 급등 필터 포함)</p>
    </div>
  );
};

export default DropShippingPanel;
