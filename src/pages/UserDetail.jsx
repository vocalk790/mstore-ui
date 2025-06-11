// src/pages/UserDetail.jsx
import React from 'react';

export default function UserDetail() {
  const user = {
    name: '김철수',
    email: 'chulsoo@example.com',
    joined: '2024-05-20',
    level: 'VIP',
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        👤 사용자 상세 정보
      </h1>

      <div className="bg-white dark:bg-zinc-900 shadow-md rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              이름
            </label>
            <div className="mt-1 text-base text-gray-900 dark:text-white">{user.name}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              이메일
            </label>
            <div className="mt-1 text-base text-gray-900 dark:text-white">{user.email}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              가입일
            </label>
            <div className="mt-1 text-base text-gray-900 dark:text-white">{user.joined}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              등급
            </label>
            <div className="mt-1 text-base text-gray-900 dark:text-white">{user.level}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
