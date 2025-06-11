// 📁 경로: src/components/panels/AllBotCommandPanel.jsx

import React, { useState } from "react";
import Button from "../ui/Button";

const AllBotCommandPanel = () => {
  const [log, setLog] = useState([]);
  const [input, setInput] = useState("");

  const runCommand = () => {
    const result = `🧠 AllBot 실행: “${input}” → 명령 수행 완료`;
    setLog((prev) => [...prev, result]);
    setInput("");
  };

  return (
    <div className="bg-white text-black p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-3">🤖 AllBot 명령 패널</h2>

      <div className="flex items-center gap-2 mb-4">
        <input
          className="flex-1 px-3 py-2 border rounded-md text-sm"
          placeholder="예: 오늘 리포트 보여줘"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={runCommand}>실행</Button>
      </div>

      <div className="bg-gray-100 rounded-md p-3 h-40 overflow-y-auto text-sm">
        {log.length === 0 ? (
          <p className="text-gray-400">AllBot 명령 기록이 여기에 표시됩니다.</p>
        ) : (
          log.map((line, idx) => <div key={idx}>✅ {line}</div>)
        )}
      </div>
    </div>
  );
};

export default AllBotCommandPanel;
