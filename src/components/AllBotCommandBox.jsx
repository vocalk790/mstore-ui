import React, { useState } from 'react';
import axios from 'axios';

const AllBotCommandBox = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleCommand = async () => {
    try {
      const response = await axios.post('https://n8n.도메인.com/webhook/allbot-command', {
        command: input.trim(),
      });
      setOutput(response.data.reply ?? '응답 없음');
    } catch (error) {
      setOutput('명령 실행 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md h-full">
      <h2 className="text-lg font-bold mb-2">🤖 AllBot 명령 입력</h2>
      <div className="flex mb-2">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-l-xl px-4 py-2"
          placeholder="예: 상품 분석해"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-xl"
          onClick={handleCommand}
        >
          실행
        </button>
      </div>
      <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 min-h-[100px] whitespace-pre-wrap">
        {output}
      </div>
    </div>
  );
};

export default AllBotCommandBox;
