// ✅ src/pages/VirtualAccount.jsx
import React, { useState } from 'react';

const VirtualAccount = () => {
  const [bank, setBank] = useState('우리은행');
  const [accountNumber, setAccountNumber] = useState('');
  const [issued, setIssued] = useState(false);

  const generateVirtualAccount = () => {
    const fakeAccount = `${Math.floor(Math.random() * 10000000000)}`;
    setAccountNumber(fakeAccount);
    setIssued(true);
    // 실제 발급 API 연동 시 해당 부분에서 처리
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">가상계좌 발급</h2>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          은행 선택
          <select
            className="mt-1 block w-full border rounded p-2"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          >
            <option>우리은행</option>
            <option>국민은행</option>
            <option>신한은행</option>
            <option>카카오뱅크</option>
          </select>
        </label>

        <button
          onClick={generateVirtualAccount}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          가상계좌 발급하기
        </button>

        {issued && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">📄 발급된 계좌정보</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">은행명: {bank}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">계좌번호: {accountNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualAccount;
