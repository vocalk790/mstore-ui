import React, { useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { submitPayoutRequest } from '../services/payoutAPI';

const MyWallet = () => {
  const { user } = useAuth();
  const payoutBtnRef = useRef(null);

  // AllBot 명령어 자동 트리거
  window.triggerPayoutRequest = () => {
    if (payoutBtnRef.current) {
      payoutBtnRef.current.click();
    }
  };

  const handlePayout = async () => {
    const success = await submitPayoutRequest(user.email, 10000); // 💸 금액 예시
    if (success) {
      alert('출금 신청이 접수되었습니다. 관리자 승인을 기다려주세요.');
    } else {
      alert('출금 신청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">💰 내 지갑</h2>
        <p className="text-sm text-gray-500 mb-6">환영합니다, {user?.email}님</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold">₩1,200,000</p>
            <p className="text-xs text-gray-600">현재 잔액</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold">3건</p>
            <p className="text-xs text-gray-600">출금 요청 이력</p>
          </div>
        </div>

        <button
          ref={payoutBtnRef}
          onClick={handlePayout}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          출금 신청
        </button>
      </div>
    </div>
  );
};

export default MyWallet;
