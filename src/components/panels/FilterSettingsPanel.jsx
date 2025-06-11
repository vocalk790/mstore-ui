// 📁 경로: src/components/panels/FilterSettingsPanel.jsx

import React, { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

const FilterSettingsPanel = ({ onApply }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [country, setCountry] = useState("");

  const applyFilter = () => {
    const filters = {
      minPrice,
      maxPrice,
      country,
    };
    onApply?.(filters);
    alert("🧠 조건 필터가 적용되었습니다.");
  };

  return (
    <div className="bg-white text-black p-4 rounded-xl shadow-md space-y-4">
      <h2 className="text-lg font-bold">🎛 조건 설정</h2>

      <Input
        label="최소 매입가"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="예: 10000"
      />

      <Input
        label="최대 매입가"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="예: 50000"
      />

      <Input
        label="국가 필터"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="예: 한국, 미국 등"
      />

      <div className="text-right">
        <Button onClick={applyFilter}>적용하기</Button>
      </div>
    </div>
  );
};

export default FilterSettingsPanel;
