import React from 'react';

const MarketTable = ({ markets }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">국가별 쇼핑몰 수익 현황</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">국가</th>
              <th className="px-4 py-2">쇼핑몰명</th>
              <th className="px-4 py-2">통화</th>
              <th className="px-4 py-2">수익률</th>
              <th className="px-4 py-2">회전율</th>
              <th className="px-4 py-2">상태</th>
            </tr>
          </thead>
          <tbody>
            {markets?.length > 0 ? (
              markets.map((market, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center">
                      <span className="mr-1">{market.flag}</span>
                      {market.country}
                    </span>
                  </td>
                  <td className="px-4 py-2">{market.name}</td>
                  <td className="px-4 py-2">{market.currency}</td>
                  <td className="px-4 py-2">{market.profitRate}%</td>
                  <td className="px-4 py-2">{market.turnoverRate}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        market.status === '정상'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {market.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-400 py-6">
                  등록된 쇼핑몰이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketTable;
