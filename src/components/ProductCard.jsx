// src/components/ProductCard.jsx
import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-500">가격: {product.price.toLocaleString()}원</p>
      <p className="text-gray-400 text-sm mt-2">{product.description}</p>
    </div>
  );
}
