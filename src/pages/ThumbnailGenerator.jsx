// 📁 /src/pages/ThumbnailGenerator.jsx
import React, { useState } from "react";

function ThumbnailGenerator() {
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/generate-thumbnail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setThumbnail(imageUrl);
      } else {
        alert("❌ 썸네일 생성 실패");
      }
    } catch (error) {
      console.error(error);
      alert("❌ 요청 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🖼️ 썸네일 자동 생성기</h2>

      <input
        type="text"
        placeholder="쇼핑몰 상품 URL을 입력하세요"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        disabled={loading}
      >
        {loading ? "생성 중..." : "썸네일 생성하기"}
      </button>

      {thumbnail && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">📸 생성된 썸네일:</h3>
          <img
            src={thumbnail}
            alt="썸네일"
            className="w-full border rounded shadow-md"
          />
        </div>
      )}
    </div>
  );
}

export default ThumbnailGenerator;
