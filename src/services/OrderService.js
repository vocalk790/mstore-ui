// ✅ src/services/OrderService.js
export const saveOrder = (order) => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push({
    ...order,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem('orders', JSON.stringify(orders));
  console.log('[✔] 주문 저장 완료:', order);
};
