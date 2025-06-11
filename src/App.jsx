import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 페이지 컴포넌트 import
import Dashboard from "./pages/Dashboard";
import ComponentsPreview from "./pages/ComponentsPreview";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 대시보드 */}
        <Route path="/" element={<Dashboard />} />

        {/* 컴포넌트 프리뷰 */}
        <Route path="/components-preview" element={<ComponentsPreview />} />
      </Routes>
    </Router>
  );
};

export default App;
