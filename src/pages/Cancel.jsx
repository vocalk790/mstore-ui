// ✅ src/pages/Cancel.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">❌ 결제 실패 또는 취소</h1>
      <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
        결제가 완료되지 않았습니다. 다시 시도하시거나, 고객센터에 문의해 주세요.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
      >
        홈으로 이동
      </Link>
    </div>
  );
};

export default Cancel;


// ✅ src/pages/AdminOrderList.jsx (관리자 주문 승인 UI)
import React, { useState } from 'react';

const sampleOrders = [
  {
    id: 1,
    customer: '김천회',
    item: '무선 이어폰',
    amount: 49000,
    status: '대기중',
  },
  {
    id: 2,
    customer: '홍길동',
    item: '스마트 워치',
    amount: 89000,
    status: '대기중',
  },
];

const AdminOrderList = () => {
  const [orders, setOrders] = useState(sampleOrders);

  const handleApprove = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: '승인됨' } : order
      )
    );
  };

  const handleReject = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: '거절됨' } : order
      )
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">🧾 관리자 주문 승인</h2>
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left">
            <th className="p-3">주문자</th>
            <th className="p-3">상품명</th>
            <th className="p-3">금액</th>
            <th className="p-3">상태</th>
            <th className="p-3">조치</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t dark:border-gray-700">
              <td className="p-3">{order.customer}</td>
              <td className="p-3">{order.item}</td>
              <td className="p-3">₩{order.amount.toLocaleString()}</td>
              <td className="p-3">{order.status}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => handleApprove(order.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  승인
                </button>
                <button
                  onClick={() => handleReject(order.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  거절
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderList;
