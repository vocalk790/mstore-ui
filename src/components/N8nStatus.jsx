export default function N8nStatus() {
  const isConnected = true;

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="text-lg font-bold mb-2">🛰 n8n 자동화 상태</h2>
      <div className="flex items-center space-x-4">
        <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
        <span className="text-sm">
          {isConnected ? 'n8n 서버 연동 성공 ✅' : 'n8n 서버 응답 없음 ❌'}
        </span>
      </div>
    </div>
  );
}
