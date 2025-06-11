import React, { useEffect, useState } from 'react';
import SummaryCards from '../components/SummaryCards';
import ProfitReport from '../components/ProfitReport';
import VisitorsChart from '../components/VisitorsChart';
import TopProductsChart from '../components/TopProductsChart';
import axios from 'axios';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('상품 데이터 로딩 실패', err));
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📊 대시보드</h1>

      <SummaryCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ProfitReport />
        <VisitorsChart />
      </div>

      <div className="mt-10">
        <TopProductsChart products={products} />
      </div>
    </div>
  );
};

export default Dashboard;
