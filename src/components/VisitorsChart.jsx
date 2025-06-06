import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { day: '월', visits: 1200 },
  { day: '화', visits: 2100 },
  { day: '수', visits: 800 },
  { day: '목', visits: 1600 },
  { day: '금', visits: 2000 },
  { day: '토', visits: 2500 },
  { day: '일', visits: 3000 },
];

export default function VisitorsChart() {
  return (
    <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow mt-8">
      <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
        📈 주간 방문자 수
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="visits"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
