import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { date: '6월 1일', visits: 120 },
  { date: '6월 2일', visits: 98 },
  { date: '6월 3일', visits: 140 },
  { date: '6월 4일', visits: 180 },
  { date: '6월 5일', visits: 160 },
  { date: '6월 6일', visits: 200 },
  { date: '6월 7일', visits: 250 },
];

const VisitorsChart = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-4">📈 방문자 통계 (최근 7일)</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="visits" stroke="#4F46E5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VisitorsChart;
