import React from 'react';
import GlobalProductCard from '../components/GlobalProductCard';

const globalProducts = [
  {
    id: 1,
    name: '무선 이어폰',
    price: 49000,
    image: 'https://via.placeholder.com/200',
    country: '🇨🇳 AliExpress',
    link: 'https://www.aliexpress.com/item/100500...',
  },
  {
    id: 2,
    name: '스마트 워치',
    price: 89000,
    image: 'https://via.placeholder.com/200',
    country: '🇺🇸 Amazon',
    link: 'https://www.amazon.com/dp/B0...',
  },
  {
    id: 3,
    name: '게이밍 마우스',
    price: 29000,
    image: 'https://via.placeholder.com/200',
    country: '🇸🇬 Shopee',
    link: 'https://shopee.sg/product/...',
  },
];

const GlobalProductList = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">🌍 글로벌 인기 상품</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {globalProducts.map((product) => (
          <GlobalProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default GlobalProductList;
