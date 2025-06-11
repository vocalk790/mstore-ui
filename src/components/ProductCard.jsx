// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ name, price, image }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-sm text-grayText">₩{price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard;
