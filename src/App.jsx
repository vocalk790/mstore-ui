// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import VisitorsChart from './components/VisitorsChart';
import Login from './pages/Login';
import Toast from './components/Toast';

export default function App() {
  const [dark, setDark] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  // 🌙 다크모드
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  // ✅ 로그인 유지 (localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      setLoggedInUser(savedUser);
    }
  }, []);

  // 로그인 처리 + localStorage 저장
  const handleLogin = (email) => {
    setLoggedInUser(email);
    localStorage.setItem('loggedInUser', email);
    setToastMsg('✅ 로그인 성공!');
  };

  // 토스트 닫기
  const closeToast = () => setToastMsg('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white p-6 transition">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">📊 Mstore 대시보드</h1>
          {loggedInUser && (
            <p className="text-sm text-gray-500 dark:text-gray-300">
              👋 {loggedInUser}님 환영합니다!
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1 text-sm rounded bg-zinc-800 text-white hover:bg-zinc-700"
          >
            {dark ? '☀️ 라이트모드' : '🌙 다크모드'}
          </button>
          <Link
            to="/login"
            className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
          >
            로그인
          </Link>
        </div>
      </div>

      {/* 라우팅 */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* 카드 UI */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white dark:bg-zinc-800 p-5 rounded-2xl shadow hover:shadow-lg transition">
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">총 매출</h2>
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">₩12,450,000</p>
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
              <VisitorsChart />
            </>
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
  );
}
