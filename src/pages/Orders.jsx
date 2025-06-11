// ✅ 1. 주문 내역 리스트 (src/pages/Orders.jsx)
import React from 'react';

const mockOrders = [
  {
    id: '20240601-001',
    product: '무선 이어폰',
    amount: 49000,
    date: '2025-06-01',
    status: '결제 완료',
  },
  {
    id: '20240601-002',
    product: '스마트 워치',
    amount: 89000,
    date: '2025-06-02',
    status: '배송 중',
  },
];

const Orders = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">📜 주문 내역</h2>
      <table className="w-full bg-white dark:bg-gray-800 rounded shadow">
        <thead>
          <tr className="text-left border-b border-gray-300 dark:border-gray-700">
            <th className="p-3">주문번호</th>
            <th className="p-3">상품</th>
            <th className="p-3">금액</th>
            <th className="p-3">날짜</th>
            <th className="p-3">상태</th>
          </tr>
        </thead>
        <tbody>
          {mockOrders.map((order) => (
            <tr key={order.id} className="border-b border-gray-200 dark:border-gray-600">
              <td className="p-3">{order.id}</td>
              <td className="p-3">{order.product}</td>
              <td className="p-3">₩{order.amount.toLocaleString()}</td>
              <td className="p-3">{order.date}</td>
              <td className="p-3 text-blue-600 dark:text-blue-400">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;

// 이후 ShippingForm.jsx, Cancel.jsx, AdminOrders.jsx 등도 이어서 생성됩니다.
