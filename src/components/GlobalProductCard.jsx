import React from 'react';

const GlobalProductCard = ({ product }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-52 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{product.country}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-blue-600 dark:text-blue-400 font-bold">
            ₩{product.price.toLocaleString()}
          </span>
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700"
          >
            구매하기
          </a>
        </div>
      </div>
    </div>
  );
};

export default GlobalProductCard;
