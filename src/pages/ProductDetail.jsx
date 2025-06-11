
// src/pages/ProductDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => setError('상품 정보를 불러오는 데 실패했습니다.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">⌛ 로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🛍️ 상품 상세 정보</h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <div><span className="font-semibold">상품명:</span> {product.name}</div>
        <div><span className="font-semibold">카테고리:</span> {product.category}</div>
        <div><span className="font-semibold">가격:</span> ₩{product.price.toLocaleString()}</div>
        <div><span className="font-semibold">등록일:</span> {new Date(product.createdAt).toLocaleDateString()}</div>
        <div className="col-span-2">
          <span className="font-semibold">설명:</span>
          <p className="mt-1 text-sm text-gray-600">{product.description || '설명이 없습니다.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
