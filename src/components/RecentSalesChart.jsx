// src/components/RecentSalesChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { date: "6/1", sales: 500000 },
  { date: "6/2", sales: 700000 },
  { date: "6/3", sales: 350000 },
  { date: "6/4", sales: 800000 },
  { date: "6/5", sales: 620000 },
  { date: "6/6", sales: 900000 },
  { date: "6/7", sales: 750000 },
];

const RecentSalesChart = () => {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">📈 최근 7일 매출</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`} />
          <Tooltip formatter={(v) => `${v.toLocaleString()}원`} />
          <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RecentSalesChart;
