import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Toast from './components/Toast';
import VisitorsChart from './components/VisitorsChart';

function App() {
  const [toastMsg, setToastMsg] = useState('');

  const handleLogin = () => {
    setToastMsg('로그인 성공!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const closeToast = () => {
    setToastMsg('');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white p-4">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-3xl font-bold mb-4">M스토어 대시보드</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-zinc-800 p-5 rounded-2xl shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">매출</h2>
                    <p className="text-3xl font-bold text-indigo-500 dark:text-indigo-400">₩12,450,000</p>
                    <p className="text-sm text-gray-400 mt-1">이번 달 기준</p>
                  </div>

                  <div className="bg-white dark:bg-zinc-800 p-5 rounded-2xl shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">방문자 수</h2>
                    <p className="text-3xl font-bold text-blue-500 dark:text-blue-400">8,235명</p>
                    <p className="text-sm text-gray-400 mt-1">지난 주 대비 +12%</p>
                  </div>

                  <div className="bg-white dark:bg-zinc-800 p-5 rounded-2xl shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">신규 가입자</h2>
                    <p className="text-3xl font-bold text-green-500 dark:text-green-400">1,230명</p>
                    <p className="text-sm text-gray-400 mt-1">전월 대비 +8%</p>
                  </div>
                </div>

                {/* 방문자 차트 */}
                <div className="mt-10">
                  <VisitorsChart />
                </div>
              </div>
            }
          />

          <Route
            path="/login"
            element={<Login onLogin={handleLogin} setToastMsg={setToastMsg} />}
          />
        </Routes>

        {/* 토스트 메시지 출력 */}
        {toastMsg && <Toast message={toastMsg} onClose={closeToast} />}
      </div>
    </Router>
  );
}

export default App;
