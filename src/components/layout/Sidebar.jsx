// 📁 경로: src/components/layout/Sidebar.jsx (업데이트 포함 배송/반품 설정창)

import React from "react";
import classNames from "classnames";
import Button from "../ui/Button";
import AllBotCommandPanel from "../panels/AllBotCommandPanel";
import FilterSettingsPanel from "../panels/FilterSettingsPanel";
import ShippingSettingsPanel from "../panels/ShippingSettingsPanel";

const Sidebar = ({ open, setOpen }) => {
  const [activePanel, setActivePanel] = React.useState(null);

  const sections = [
    { label: "AllBot 명령창", key: "allbot" },
    { label: "조건 설정", key: "filters" },
    { label: "배송/반품 설정", key: "shipping" },
    { label: "상품 자동 분석", key: "analysis" },
    { label: "매출 리포트", key: "report" },
    { label: "고객지원봇", key: "support" },
  ];

  return (
    <div
      className={classNames(
        "fixed top-0 left-0 h-full w-80 bg-[#11131a] text-white shadow-2xl z-50 transition-transform duration-300 overflow-y-auto",
        {
          "-translate-x-full": !open,
          "translate-x-0": open,
        }
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold">🔧 설정 메뉴</h2>
        <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">✕</button>
      </div>

      <ul className="p-4 space-y-3">
        {sections.map((item) => (
          <li
            key={item.key}
            className="hover:bg-gray-800 px-3 py-2 rounded-md cursor-pointer text-sm"
            onClick={() => setActivePanel(item.key)}
          >
            {item.label}
          </li>
        ))}
      </ul>

      <div className="p-4">
        {activePanel === "allbot" && <AllBotCommandPanel />}
        {activePanel === "filters" && <FilterSettingsPanel />}
        {activePanel === "shipping" && <ShippingSettingsPanel />}
        {activePanel && !["allbot", "filters", "shipping"].includes(activePanel) && (
          <div className="text-sm text-gray-400">🔧 {activePanel} 설정창은 곧 연결됩니다.</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
