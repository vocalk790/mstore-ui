// src/components/Header.jsx
import React from "react";
import { LogOut, Globe, Moon, Sun } from "lucide-react";
import useDarkMode from "@/hooks/useDarkMode";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const { t, i18n } = useTranslation();

  const user = {
    name: "관리자",
    email: "admin@example.com",
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm">
      <div className="text-lg font-semibold text-gray-800 dark:text-white">
        {t("admin_system")}
      </div>

      <div className="flex items-center space-x-4">
        {/* 🌙 다크모드 스위치 */}
        <button
          title="모드 전환"
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* 🌐 언어 전환 */}
        <button
          title="언어 전환"
          onClick={() => i18n.changeLanguage(i18n.language === "ko" ? "en" : "ko")}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
        >
          <Globe size={20} />
        </button>

        {/* 👤 사용자 정보 */}
        <div className="text-sm text-right leading-tight">
          <div className="font-medium text-gray-800 dark:text-white">{user.name}</div>
          <div className="text-gray-500 dark:text-gray-300">{user.email}</div>
        </div>

        {/* 🚪 로그아웃 */}
        <button className="text-gray-500 hover:text-red-500" title="로그아웃">
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;
