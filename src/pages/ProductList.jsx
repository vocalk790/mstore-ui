// ✅ src/pages/ProductList.jsx
import React from 'react';
import ProductCard from '../components/ProductCard';

const sampleProducts = [
  {
    id: 1,
    name: '무선 이어폰',
    price: 49000,
    image: 'https://via.placeholder.com/150',
    description: '고음질 블루투스 무선 이어폰',
  },
  {
    id: 2,
    name: '스마트 워치',
    price: 89000,
    image: 'https://via.placeholder.com/150',
    description: '건강 관리 기능이 탑재된 스마트 워치',
  },
  {
    id: 3,
    name: '게이밍 마우스',
    price: 29000,
    image: 'https://via.placeholder.com/150',
    description: '고성능 유선 게이밍 마우스',
  },
];

const ProductList = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">📦 인기 상품</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;


// ✅ src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 dark:text-blue-400 font-bold">
            ₩{product.price.toLocaleString()}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
          >
            자세히 보기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


// ✅ src/pages/ProductDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        📃 상품 상세 보기 - ID: {id}
      </h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <img
          src={`https://via.placeholder.com/300`}
          alt="상품 이미지"
          className="w-full h-64 object-cover mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">샘플 상품명</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          이곳에 상품 상세 설명이 들어갑니다. 구성, 배송, 옵션 등 사용자 중심 안내를 넣을 수 있습니다.
        </p>
        <div className="text-lg font-bold text-blue-600">₩89,000</div>
      </div>
    </div>
  );
};

export default ProductDetail;
