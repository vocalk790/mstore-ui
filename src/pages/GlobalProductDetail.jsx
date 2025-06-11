import React from 'react';
import { useParams } from 'react-router-dom';

const GlobalProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        🌐 상품 상세 페이지 - ID: {id}
      </h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <img
          src={`https://via.placeholder.com/400`}
          alt="글로벌 상품"
          className="w-full h-64 object-cover mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">샘플 상품</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          이곳에 글로벌 쇼핑몰 상품의 상세 설명이 들어갑니다.
        </p>
        <div className="text-lg font-bold text-blue-600">₩89,000</div>
      </div>
    </div>
  );
};

export default GlobalProductDetail;
