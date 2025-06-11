
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DropShipping = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: '휴대용 충전기', vendor: '에이컴퍼니', stock: 12, status: '대기중' },
    { id: 2, name: '노트북 파우치', vendor: '비컴퍼니', stock: 8, status: '진행중' },
    // ... 실제 데이터로 대체하세요
  ];

  const handleRequest = (id) => {
    navigate(`/orders/${id}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-900 font-pretendard">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">🚚 드롭쉬핑 관리</h1>

        <div className="bg-white p-6 rounded-xl shadow">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">상품명</th>
                <th className="p-2">공급사</th>
                <th className="p-2">재고</th>
                <th className="p-2">상태</th>
                <th className="p-2">작업</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="text-center border-t">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.vendor}</td>
                  <td className="p-2">{p.stock}</td>
                  <td className="p-2">{p.status}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleRequest(p.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      발주 요청
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    등록된 상품이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DropShipping;
