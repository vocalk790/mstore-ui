import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">🚫 페이지를 찾을 수 없습니다</h1>
      <p className="text-gray-600 mb-6">요청하신 경로가 존재하지 않거나 이동되었습니다.</p>
      <Link to="/dashboard" className="text-blue-600 underline">🏠 대시보드로 돌아가기</Link>
    </div>
  );
};

export default NotFound;
