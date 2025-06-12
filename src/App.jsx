// 📁 /src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ThumbnailGenerator from "./pages/ThumbnailGenerator"; // ✅ 추가

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thumbnail-generator" element={<ThumbnailGenerator />} /> {/* ✅ 썸네일 경로 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
