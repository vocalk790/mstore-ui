import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import UserList from "./pages/UserList"; // ✅ 사용자 관리 페이지 import 추가
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
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<ProductForm />} />
          <Route path="/users" element={<UserList />} /> {/* ✅ 사용자 관리 라우트 추가 */}
        </Routes>
        <Toast message="Welcome to MStore!" />
      </div>
    </Router>
  );
}

export default App;
