;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList"; // 상품 목록 추가
import Toast from "./components/Toast";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">M스토어 대시보드</h1>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductList />} /> {/* ✅ 상품 목록 라우트 */}
        </Routes>
        <Toast message="Welcome to MStore!" />
      </div>
    </Router>
  );
}

export default App;
