
// src/pages/ProductForm.jsx
import React, { useState } from "react";

const ProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🧾 등록된 상품 정보:", form);
    // 이후 등록 처리 로직 추가 예정
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">🛒 상품 등록</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">상품명</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">가격 (₩)</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">재고 수량</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">카테고리</label>
            <input
              name="category"
              type="text"
              value={form.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-600">상품 설명</label>
            <textarea
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
            ></textarea>
          </div>
          <div className="sm:col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
