// src/pages/UserList.jsx
import React, { useState } from 'react';

const dummyUsers = [
  { id: 1, name: '홍길동', email: 'hong@example.com', role: '관리자' },
  { id: 2, name: '김영희', email: 'kim@example.com', role: '사용자' },
  { id: 3, name: '이철수', email: 'lee@example.com', role: '사용자' },
];

const UserList = () => {
  const [users, setUsers] = useState(dummyUsers);

  const handleDelete = (id) => {
    const filtered = users.filter((user) => user.id !== id);
    setUsers(filtered);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">사용자 관리</h2>
      <table className="w-full border table-auto text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">이름</th>
            <th className="px-4 py-2">이메일</th>
            <th className="px-4 py-2">역할</th>
            <th className="px-4 py-2">관리</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-400">
                등록된 사용자가 없습니다.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
