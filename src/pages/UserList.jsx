
// src/pages/UserList.jsx
import React from "react";
import { Link } from "react-router-dom";

const users = [
  { id: 1, name: "홍길동", email: "hong@example.com", role: "관리자", status: "활성" },
  { id: 2, name: "김민수", email: "kim@example.com", role: "사용자", status: "비활성" },
  { id: 3, name: "이영희", email: "lee@example.com", role: "판매자", status: "활성" },
];

const UserList = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">👥 사용자 목록</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600">
                <th className="p-3">이름</th>
                <th className="p-3">이메일</th>
                <th className="p-3">권한</th>
                <th className="p-3">상태</th>
                <th className="p-3 text-center">자세히</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role}</td>
                  <td className={`p-3 ${u.status === "활성" ? "text-green-600" : "text-gray-500"}`}>
                    {u.status}
                  </td>
                  <td className="p-3 text-center">
                    <Link
                      to={`/users/${u.id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      보기
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
