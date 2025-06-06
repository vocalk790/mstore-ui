import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportSection = () => {
  const [report, setReport] = useState([]);

  useEffect(() => {
    axios
      .get('https://n8n.도메인.com/webhook/mstore-report')
      .then((res) => setReport(res.data ?? []))
      .catch(() => setReport([]));
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mt-6">
      <h2 className="text-lg font-bold mb-4">📈 오늘의 수익 보고서</h2>
      {report.length > 0 ? (
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">상품</th>
              <th className="px-4 py-2">매입가</th>
              <th className="px-4 py-2">판매가</th>
              <th className="px-4 py-2">수익</th>
              <th className="px-4 py-2">수익률</th>
              <th className="px-4 py-2">예상 월수익</th>
            </tr>
          </thead>
          <tbody>
            {report.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.buyPrice?.toLocaleString()} 원</td>
                <td className="px-4 py-2">{item.sellPrice?.toLocaleString()} 원</td>
                <td className="px-4 py-2 text-green-600">{item.profit?.toLocaleString()} 원</td>
                <td className="px-4 py-2">{item.profitRate}%</td>
                <td className="px-4 py-2">
                  {(item.monthlyProfit ?? 0).toLocaleString()} 원
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-gray-400">보고서 데이터를 불러오는 중입니다...</div>
      )}
    </div>
  );
};

export default ReportSection;
