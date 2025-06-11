import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { saveOrder } from '../services/OrderService';

const Success = () => {
  const [params] = useSearchParams();
  const orderId = params.get('orderId');
  const amount = params.get('amount');
  const product = params.get('product');

  useEffect(() => {
    // 주문 정보 저장
    saveOrder({ orderId, amount, product });
  }, [orderId, amount, product]);

  return (
    <div className="p-6 max-w-xl mx-auto text-center bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">✅ 결제가 완료되었습니다!</h2>
      <p>주문번호: {orderId}</p>
      <p>상품: {product}</p>
      <p>결제금액: ₩{Number(amount).toLocaleString()}</p>
    </div>
  );
};

export default Success;
