// /src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-8">
      <h1 className="text-4xl font-bold mb-6">M스토어 자동화 시스템</h1>
      <p className="text-lg mb-8">AI 기반의 쇼핑몰 자동화 기능을 경험해보세요.</p>

      <Link
        to="/thumbnail-generator"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
      >
        썸네일 자동 생성 시작하기 →
      </Link>
    </div>
  );
}

export default Home;

