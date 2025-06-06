// src/pages/Login.jsx
import { useState } from 'react';

export default function Login({ onLogin, setToastMsg }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email); // App.jsx에서 처리
    } else {
      setToastMsg('⚠️ 이메일과 비밀번호를 입력해주세요.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">🔐 로그인</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
