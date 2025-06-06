// src/pages/ProductList.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 실제 프로젝트에서는 외부 API 주소 사용
    axios
      .get("/data/products.json") // public/data/products.json 에 있는 더미 데이터 사용
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("상품 데이터를 불러오지 못했습니다.", err));
  }, []);

  return (
    <div className="p-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}
