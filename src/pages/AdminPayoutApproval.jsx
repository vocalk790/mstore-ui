import React, { useEffect, useState } from 'react';

const AdminPayoutApproval = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 요청 목록 가져오기
  const fetchRequests = async () => {
    try {
      const res = await fetch('https://your-api-server.com/api/payout');
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error('출금 요청 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 승인 or 거절 처리
  const handleAction = async (id, action) => {
    try {
      const res = await fetch(`https://your-api-server.com/api/payout/${id}/${action}`, {
        method: 'POST',
      });

      if (res.ok) {
        alert(`${action === 'approve' ? '승인' : '거절'} 완료`);
        fetchRequests(); // 목록 새로고침
      } else {
        alert('처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('처리 오류:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <div className="p-6">⏳ 로딩 중...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">🔐 출금 승인 요청 목록</h2>
        {requests.length === 0 ? (
          <p>출금 요청이 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req) => (
              <li key={req.id} className="border rounded p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <p><strong>📧 이메일:</strong> {req.email}</p>
                  <p><strong>💸 금액:</strong> ₩{req.amount.toLocaleString()}</p>
                  <p><strong>⏰ 요청 시간:</strong> {new Date(req.requestedAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleAction(req.id, 'approve')}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    승인
                  </button>
                  <button
                    onClick={() => handleAction(req.id, 'reject')}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    거절
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPayoutApproval;
