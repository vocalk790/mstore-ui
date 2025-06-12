// ✅ M스토어 고급 UI 적용 - Sidebar 컴포넌트 추가
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, ShoppingCart, Wallet, Settings } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { label: "상품", path: "/products", icon: <LayoutGrid /> },
    { label: "주문", path: "/orders", icon: <ShoppingCart /> },
    { label: "지갑", path: "/wallet", icon: <Wallet /> },
    { label: "관리자", path: "/admin", icon: <Settings /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-56 bg-slate-50 h-screen px-4 py-6 shadow-xl rounded-tr-3xl rounded-br-3xl">
      <h2 className="text-xl font-bold text-indigo-700 mb-6">📂 관리자 메뉴</h2>
      <nav className="flex flex-col gap-3">
        {navItems.map(({ label, path, icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-indigo-100 transition ${
              location.pathname === path ? "bg-indigo-100 text-indigo-700 font-semibold" : "text-gray-700"
            }`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
