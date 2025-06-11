
// src/components/ProductTable.jsx
import React from 'react';

const ProductTable = ({ products }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md bg-white">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-sm text-grayText bg-gray-50">
            <th className="px-4 py-3">상품명</th>
            <th className="px-4 py-3">매입가</th>
            <th className="px-4 py-3">판매가</th>
            <th className="px-4 py-3">수익금</th>
            <th className="px-4 py-3">수익률</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-grayText py-6">
                등록된 상품이 없습니다.
              </td>
            </tr>
          ) : (
            products.map((item) => (
              <tr
                key={item.id}
                className="bg-gray-50 hover:bg-gray-100 transition rounded shadow-sm"
              >
                <td className="px-4 py-3 rounded-l-lg">{item.name}</td>
                <td className="px-4 py-3">₩{item.cost.toLocaleString()}</td>
                <td className="px-4 py-3">₩{item.price.toLocaleString()}</td>
                <td className="px-4 py-3 text-green-600 font-medium">
                  ₩{(item.price - item.cost).toLocaleString()}
                </td>
                <td className="px-4 py-3 rounded-r-lg text-blue-500">
                  {(((item.price - item.cost) / item.cost) * 100).toFixed(1)}%
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
