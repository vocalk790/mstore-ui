import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 컴포넌트 임포트
import SummaryCards from './components/SummaryCards';
import ProductTable from './components/ProductTable';
import MarketTable from './components/MarketTable';
import ChartSection from './components/ChartSection';
import AllBotCommandBox from './components/AllBotCommandBox';
import N8nStatus from './components/N8nStatus';
import ReportSection from './components/ReportSection';

const Dashboard = () => {
  // 상태 관리
  const [summaryData, setSummaryData] = useState({
    startAmount: 0,
    buyAmount: 0,
    sellAmount: 0,
    profitRate: 0,
    profit: 0,
    balance: 0
  });
  const [products, setProducts] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 로딩
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('https://n8n.도메인.com/webhook/mstore-daily-report');
        const { summary, productList, marketList } = res.data;
        
        setSummaryData(summary ?? {
          startAmount: 0,
          buyAmount: 0,
          sellAmount: 0,
          profitRate: 0,
          profit: 0,
          balance: 0
        });
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3B82F6]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans">
      {/* 메인 컨테이너 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 요약 카드 섹션 */}
        <div className="mb-8">
          <SummaryCards data={summaryData} />
        </div>

        {/* 상품 및 마켓 테이블 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <ProductTable products={products} />
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <MarketTable markets={markets} />
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <ChartSection data={chartData} />
          </div>
        </div>

        {/* 리포트 섹션 */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <ReportSection />
          </div>
        </div>

        {/* 올봇 명령 및 상태 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <AllBotCommandBox />
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <N8nStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
