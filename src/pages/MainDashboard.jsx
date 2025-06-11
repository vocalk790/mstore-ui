
// 📁 경로: src/pages/MainDashboard.jsx

import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Chart from "../components/ui/Chart";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";

const MainDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chartData = [
    { date: "6/01", "기록 수익": 120000, "실시간 수익": 102000 },
    { date: "6/02", "기록 수익": 140000, "실시간 수익": 108000 },
    { date: "6/03", "기록 수익": 180000, "실시간 수익": 120000 },
  ];

  const tableData = [
    { name: "에어팟 Pro", cost: 210000, sale: 259000, rate: "23%", status: "판매중" },
    { name: "갤럭시워치", cost: 150000, sale: 189000, rate: "26%", status: "입고대기" },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white p-4">
      <button
        onClick={() => setSidebarOpen(true)}
        className="bg-white text-black rounded px-4 py-2 mb-4"
      >
        ☰ 메뉴
      </button>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <h1 className="text-2xl font-bold mb-6">M스토어 대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="총 매입가" description="1,200,000원" />
        <Card title="총 판매가" description="1,540,000원" />
        <Card title="예상 수익률" description="28%" />
      </div>

      <Chart data={chartData} />

      <h2 className="text-xl font-bold mt-8 mb-2">📦 실시간 상품 리스트</h2>
      <Table
        columns={[
          { header: "상품명", accessor: "name" },
          { header: "매입가", accessor: "cost" },
          { header: "판매가", accessor: "sale" },
          { header: "수익률", accessor: "rate" },
          { header: "상태", accessor: "status" },
        ]}
        data={tableData}
      />

      <div className="mt-8 text-gray-400 text-sm">
        ※ 이 화면은 MCP + n8n + OpenAI 기반 자동화 기능과 실시간 연동되어 최적화되었습니다.
      </div>
    </div>
  );
};

export default MainDashboard;
