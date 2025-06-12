// /src/pages/ThumbnailGenerator.jsx
import React, { useState } from "react";

function ThumbnailGenerator() {
  const [productUrl, setProductUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/generate-thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: productUrl }),
      });
      const data = await response.json();
      setThumbnailUrl(data.thumbnail_url);
    } catch (error) {
      alert("썸네일 생성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-4">🧠 썸네일 자동 생성기</h2>
      <input
        type="text"
        placeholder="상품 URL을 입력하세요"
        className="w-full p-3 border rounded mb-4"
        value={productUrl}
        onChange={(e) => setProductUrl(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
      >
        {loading ? "생성 중..." : "썸네일 생성"}
      </button>

      {thumbnailUrl && (
        <div className="mt-6">
          <p className="mb-2 text-sm text-gray-500">썸네일 미리보기:</p>
          <img src={thumbnailUrl} alt="Generated Thumbnail" className="rounded shadow" />
        </div>
      )}
    </div>
  );
}

export default ThumbnailGenerator;
