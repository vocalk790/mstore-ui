import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const COMMAND_ACTIONS = {
  '출금': '출금 요청',
  '리포트': '리포트 보기',
  '매입': '상품 자동 매입',
};

export default function AllBotChat() {
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    const command = Object.keys(COMMAND_ACTIONS).find((cmd) =>
      value.includes(cmd)
    );
    if (command) {
      setSuggestion(COMMAND_ACTIONS[command]);
    } else {
      setSuggestion('');
    }
  };

  const handleSubmit = () => {
    alert(`🧠 AllBot 실행: ${suggestion || input}`);
    setInput('');
    setSuggestion('');
  };

  return (
    <div className="p-6 border rounded-xl bg-white shadow-md space-y-4">
      <h2 className="text-xl font-bold">🤖 AllBot 명령어</h2>
      <Input
        placeholder="예: 출금 요청해줘"
        value={input}
        onChange={handleChange}
        className="text-base"
      />
      {suggestion && (
        <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">
          🔍 {suggestion}
        </Button>
      )}
    </div>
  );
}
