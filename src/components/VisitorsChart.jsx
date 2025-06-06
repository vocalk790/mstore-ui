// src/components/VisitorsChart.jsx
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
  { date: "월", 방문자: 200 },
  { date: "화", 방문자: 400 },
  { date: "수", 방문자: 300 },
  { date: "목", 방문자: 500 },
  { date: "금", 방문자: 700 },
  { date: "토", 방문자: 450 },
  { date: "일", 방문자: 620 },
];

export default function VisitorsChart() {
  return (
    <div className="bg-white shadow rounded-2xl p-6 h-96">
      <h2 className="text-lg font-semibold mb-4">📈 주간 방문자 추이</h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="방문자" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
