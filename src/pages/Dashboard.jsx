
import React, { useEffect, useState } from 'react';
import SummaryCards from '../components/SummaryCards';
import ProductTable from '../components/ProductTable';
import MarketTable from '../components/MarketTable';
import ChartSection from '../components/ChartSection';
import AllBotCommandBox from '../components/AllBotCommandBox';
import N8nStatus from '../components/N8nStatus';
import ReportSection from '../components/ReportSection';
import axios from 'axios';

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState({});
  const [products, setProducts] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://n8n.도메인.com/webhook/mstore-daily-report');
        const { summary, productList, marketList } = res.data;
        setSummaryData(summary ?? {});
        setProducts(productList ?? []);
        setMarkets(marketList ?? []);
        const chart = (productList ?? []).map((p) => ({
          name: p.name,
          profitRate: p.profitRate ?? 0,
          turnoverRate: p.turnoverRate ?? 0,
        }));
        setChartData(chart);
      } catch (err) {
        console.error('데이터 로딩 오류:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <SummaryCards data={summaryData} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ProductTable products={products} />
        <MarketTable markets={markets} />
      </div>

      <div className="mt-6">
        <ChartSection data={chartData} />
      </div>

      <div className="mt-6">
        <ReportSection />
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AllBotCommandBox />
        <N8nStatus />
      </div>
    </div>
  );
};

export default Dashboard;
