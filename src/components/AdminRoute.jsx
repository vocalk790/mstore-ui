// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'admin') {
    return (
      <div className="text-center text-red-600 mt-10">
        ⛔ 접근 권한이 없습니다. 관리자만 볼 수 있는 페이지입니다.
      </div>
    );
  }

  return element;
};

export default AdminRoute;
