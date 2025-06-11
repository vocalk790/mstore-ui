
import React from 'react';

const Checkout = () => {
  const handlePayment = () => {
    const orderId = 'ORD' + Date.now();
    const amount = 53500;
    const product = '무선 이어폰';

    const redirectUrl = encodeURIComponent(`http://localhost:3000/success?orderId=${orderId}&amount=${amount}&product=${product}`);

    // 예: 토스페이먼츠/이니시스 연동 URL 또는 mockup 결제 시뮬레이터로 이동
    const paymentUrl = `https://pg-demo.com/pay?amount=${amount}&orderId=${orderId}&redirect=${redirectUrl}`;

    window.location.href = paymentUrl;
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">결제 진행</h2>
      <p className="mb-2">상품: 무선 이어폰</p>
      <p className="mb-4">총 결제 금액: ₩53,500</p>
      <button
        onClick={handlePayment}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        결제하기
      </button>
    </div>
  );
};

export default Checkout;
