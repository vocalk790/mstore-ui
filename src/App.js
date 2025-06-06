
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import DropShipping from './pages/DropShipping';
import AutoPurchase from './pages/AutoPurchase';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div>
        <h1>M스토어 대시보드</h1>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dropshipping" element={<DropShipping />} />
          <Route path="/autopurchase" element={<AutoPurchase />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
