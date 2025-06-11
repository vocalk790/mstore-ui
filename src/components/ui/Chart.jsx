// 📁 경로: src/components/ui/Chart.jsx

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md text-black">
      <h3 className="text-sm font-semibold mb-3">📈 수익 곡선</h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Line type="monotone" dataKey="기록 수익" stroke="#00e6e6" strokeWidth={2} />
          <Line type="monotone" dataKey="실시간 수익" stroke="#ff5050" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
