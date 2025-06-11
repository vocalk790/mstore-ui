
import React, { useState } from 'react';

const Settings = () => {
  const [emailNoti, setEmailNoti] = useState(true);
  const [smsNoti, setSmsNoti] = useState(false);
  const [theme, setTheme] = useState('light');

  return (
    <div className="min-h-screen p-8 bg-gray-50 text-gray-900 font-pretendard">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-primary mb-6">⚙️ 설정</h1>

        <div className="space-y-6">
          {/* 알림 설정 */}
          <div>
            <h2 className="text-lg font-semibold mb-2">🔔 알림 설정</h2>
            <label className="flex items-center space-x-3 mb-2">
              <input type="checkbox" checked={emailNoti} onChange={() => setEmailNoti(!emailNoti)} />
              <span>이메일 알림</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" checked={smsNoti} onChange={() => setSmsNoti(!smsNoti)} />
              <span>SMS 알림</span>
            </label>
          </div>

          {/* 테마 설정 */}
          <div>
            <h2 className="text-lg font-semibold mb-2">🎨 테마 설정</h2>
            <select
              className="border rounded px-3 py-2 w-full"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">라이트 모드</option>
              <option value="dark">다크 모드</option>
            </select>
          </div>

          {/* 비밀번호 변경 */}
          <div>
            <h2 className="text-lg font-semibold mb-2">🔐 비밀번호 변경</h2>
            <input type="password" placeholder="현재 비밀번호" className="w-full px-3 py-2 border rounded mb-2" />
            <input type="password" placeholder="새 비밀번호" className="w-full px-3 py-2 border rounded mb-2" />
            <input type="password" placeholder="새 비밀번호 확인" className="w-full px-3 py-2 border rounded" />
          </div>

          {/* 저장 버튼 */}
          <div className="text-right mt-4">
            <button className="bg-primary text-white px-5 py-2 rounded-xl hover:bg-blue-600 transition">
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
