// ✅ src/pages/ShippingForm.jsx
import React, { useState } from 'react';

const ShippingForm = () => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('배송 정보가 저장되었습니다.');
    // 👉 실제 저장 API 또는 상태 업데이트 연동 가능
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">📦 배송 정보 입력</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="주소"
          value={form.address}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="도시"
          value={form.city}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="우편번호"
          value={form.postalCode}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="국가"
          value={form.country}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="전화번호"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          저장하기
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
