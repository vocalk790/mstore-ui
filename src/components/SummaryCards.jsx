// src/components/SummaryCards.jsx
import React from 'react';

const SummaryCards = ({ title, value, icon }) => {
  return (
    <div className="bg-gradient-to-br from-primary to-accent text-white rounded-2xl p-6 shadow-xl transition-transform hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-light tracking-wide opacity-80">{title}</p>
          <h2 className="text-2xl font-semibold mt-1 tracking-tight">{value}</h2>
        </div>
        {icon && <div className="text-3xl opacity-60">{icon}</div>}
      </div>
    </div>
  );
};

export default SummaryCards;
