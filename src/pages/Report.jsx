import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/datepicker';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const mockReports = [
  {
    id: 1,
    product: '스마트워치',
    country: '미국',
    profitRate: 35,
    revenue: 92000,
    date: '2024-06-01'
  },
  {
    id: 2,
    product: '블루투스 이어폰',
    country: '일본',
    profitRate: 28,
    revenue: 61000,
    date: '2024-06-03'
  },
  {
    id: 3,
    product: '전자책 리더기',
    country: '독일',
    profitRate: 42,
    revenue: 114000,
    date: '2024-06-02'
  },
];

export default function Report() {
  const [filteredDate, setFilteredDate] = useState('');
  const [sortedReports, setSortedReports] = useState(mockReports);

  const handleSort = () => {
    const sorted = [...sortedReports].sort((a, b) => b.profitRate - a.profitRate);
    setSortedReports(sorted);
  };

  const handleDateChange = (e) => {
    setFilteredDate(e.target.value);
  };

  const filtered = sortedReports.filter((r) =>
    filteredDate ? r.date === filteredDate : true
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 리포트 페이지</h1>

      <div className="flex flex-wrap gap-4 items-center">
        <Input type="date" value={filteredDate} onChange={handleDateChange} />
        <Button onClick={handleSort}>수익률 높은 순</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((report) => (
          <Card key={report.id} className="hover:shadow-xl transition-shadow">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{report.product}</h2>
              <p className="text-sm text-gray-500">국가: {report.country}</p>
              <p className="text-sm">수익률: {report.profitRate}%</p>
              <p className="text-sm">수익금: ₩{report.revenue.toLocaleString()}</p>
              <p className="text-xs text-gray-400">날짜: {report.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
