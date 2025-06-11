import React from 'react';
import SummaryCards from '../components/SummaryCards';
import ProfitReport from '../components/ProfitReport';
import VisitorsChart from '../components/VisitorsChart';
import TopProductsChart from '../components/TopProductsChart';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen font-pretendard">
      <h1 className="text-2xl font-bold text-primary mb-6">📊 대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <SummaryCards />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <ProfitReport />
        <VisitorsChart />
      </div>

      <div className="bg-white rounded-xl p-4 shadow">
        <TopProductsChart />
      </div>
    </div>
  );
};

export default Dashboard;
