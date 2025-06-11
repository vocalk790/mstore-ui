// src/pages/OrderList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const orders = [
  {
    id: 1,
    customer: '홍길동',
    date: '2025-06-07',
    total: '35,000원',
    status: '배송중',
  },
  {
    id: 2,
    customer: '김영희',
    date: '2025-06-05',
    total: '15,000원',
    status: '완료',
  },
];

const OrderList = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-900 font-pretendard">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">📦 주문 목록</h1>

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">고객명</th>
              <th className="p-2 border">주문일</th>
              <th className="p-2 border">총액</th>
              <th className="p-2 border">상태</th>
              <th className="p-2 border">작업</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="text-center border-t">
                <td className="p-2 border">{o.customer}</td>
                <td className="p-2 border">{o.date}</td>
                <td className="p-2 border">{o.total}</td>
                <td className="p-2 border">{o.status}</td>
                <td className="p-2 border">
                  <button
                    className="bg-primary text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => navigate(`/orders/${o.id}`)}
                  >
                    상세 보기
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  주문 정보가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
