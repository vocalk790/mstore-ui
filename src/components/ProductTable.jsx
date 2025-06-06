import React from 'react';

const ProductTable = ({ products }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">실시간 상품 리스트</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">상품명</th>
              <th className="px-4 py-2">매입가</th>
              <th className="px-4 py-2">판매가</th>
              <th className="px-4 py-2">수익금</th>
              <th className="px-4 py-2">수익률</th>
              <th className="px-4 py-2">회전율</th>
              <th className="px-4 py-2">수량</th>
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 ? (
              products.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.buyPrice.toLocaleString()} 원</td>
                  <td className="px-4 py-2">{item.sellPrice.toLocaleString()} 원</td>
                  <td className="px-4 py-2 text-green-600">{item.profit.toLocaleString()} 원</td>
                  <td className="px-4 py-2">{item.profitRate}%</td>
                  <td className="px-4 py-2">{item.turnoverRate}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-400 py-6">
                  상품 정보가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
