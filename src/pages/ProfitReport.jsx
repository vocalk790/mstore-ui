import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const ProfitReport = () => {
  const [data, setData] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    axios.get('/api/sales')
      .then(res => {
        const salesData = res.data;
        setData(salesData);

        const total = salesData.reduce((sum, item) => sum + item.profit, 0);
        const orders = salesData.reduce((sum, item) => sum + item.orders, 0);
        setTotalProfit(total);
        setTotalOrders(orders);
      })
      .catch(err => {
        console.error('매출 데이터 불러오기 실패', err);
      });
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📊 수익 분석 보고서</h2>

      <div className="flex gap-6 mb-6">
        <div className="bg-white shadow p-4 rounded w-1/2">
          <p className="text-gray-500">총 수익</p>
          <p className="text-2xl font-bold text-green-600">₩ {totalProfit.toLocaleString()}</p>
        </div>
        <div className="bg-white shadow p-4 rounded w-1/2">
          <p className="text-gray-500">총 주문 건수</p>
          <p className="text-2xl font-bold text-blue-600">{totalOrders} 건</p>
        </div>
      </div>

      <div className="bg-white shadow p-4 rounded">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 30, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="profit" stroke="#4ade80" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitReport;
