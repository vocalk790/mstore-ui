import React from 'react';

const SummaryCards = ({ data }) => {
  const cards = [
    { label: '시작금액', value: data?.startAmount ?? 0, unit: '원' },
    { label: '총 매입가', value: data?.buyAmount ?? 0, unit: '원' },
    { label: '총 매출가', value: data?.sellAmount ?? 0, unit: '원' },
    { label: '수익률', value: `${data?.profitRate ?? 0}%`, unit: '' },
    { label: '수익금', value: data?.profit ?? 0, unit: '원' },
    { label: '현재 잔액', value: data?.balance ?? 0, unit: '원' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-2xl shadow-md flex flex-col justify-center items-center"
        >
          <div className="text-gray-500 text-sm mb-1">{card.label}</div>
          <div className="text-xl font-bold">{card.value.toLocaleString()} {card.unit}</div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
