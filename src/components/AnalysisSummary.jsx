// src/components/AnalysisSummary.jsx
import React from "react";
import { motion } from "framer-motion";

const mockData = [
  { name: "무선 마우스", country: "일본", profit: 81200, rate: 87.1 },
  { name: "블루투스 스피커", country: "미국", profit: 75400, rate: 82.5 },
  { name: "충전식 가습기", country: "한국", profit: 69000, rate: 79.2 },
  { name: "LED 데스크램프", country: "중국", profit: 63500, rate: 73.4 },
  { name: "방수 이어폰", country: "독일", profit: 62000, rate: 70.1 },
];

const AnalysisSummary = () => {
  return (
    <motion.div
      className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
        📈 수익 분석 요약
      </h2>
      <ul className="space-y-2">
        {mockData.map((item, index) => (
          <li key={index} className="text-sm text-gray-800 dark:text-gray-100">
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {index + 1}. {item.name}
            </span>{" "}
            – 수익금: ₩{item.profit.toLocaleString()} / 수익률: {item.rate}% / 국가: {item.country}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default AnalysisSummary;
