// ✅ src/pages/Register.jsx
import React, { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    agreePrivacy: false,
    agreeFinance: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agreePrivacy || !form.agreeFinance) {
      alert('모든 동의 항목에 체크해주세요.');
      return;
    }
    console.log('회원가입 정보 제출:', form);
    // 🔗 여기에 실제 가입 API 연동 가능
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">회원가입</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <div className="text-sm text-gray-700 dark:text-gray-300">
          <label className="block">
            <input
              type="checkbox"
              name="agreePrivacy"
              checked={form.agreePrivacy}
              onChange={handleChange}
              className="mr-2"
            />
            개인정보 수집 및 이용 동의
          </label>
          <label className="block">
            <input
              type="checkbox"
              name="agreeFinance"
              checked={form.agreeFinance}
              onChange={handleChange}
              className="mr-2"
            />
            금융정보 활용 동의
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Register;
