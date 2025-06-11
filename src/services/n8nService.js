// 📁 경로: src/services/n8nService.js

// ✅ n8n Webhook 연동 모듈 (실시간 데이터 연동용)

const N8N_BASE_URL = "https://n8n.yourdomain.com/webhook";

// 실시간 인기/판매량/수익률 데이터 요청
export async function fetchLiveProductStats() {
  try {
    const res = await fetch(`${N8N_BASE_URL}/fetch-product-metrics`);
    if (!res.ok) throw new Error("응답 실패");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("n8n 실시간 데이터 불러오기 오류:", err);
    return null;
  }
}

// 조건 만족 시 자동매입 실행
export async function triggerAutoPurchase(productId) {
  try {
    const res = await fetch(`${N8N_BASE_URL}/auto-purchase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    const result = await res.json();
    return result;
  } catch (err) {
    console.error("자동 매입 실패:", err);
    return { success: false };
  }
}
