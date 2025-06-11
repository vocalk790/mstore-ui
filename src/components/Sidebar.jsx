import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, User, Wallet } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', icon: <Home size={18} />, label: '대시보드' },
    { path: '/settings', icon: <Settings size={18} />, label: '설정' },
    { path: '/mywallet', icon: <Wallet size={18} />, label: '지갑' },
    { path: '/users', icon: <User size={18} />, label: '사용자' },
  ];

  return (
    <aside className="w-64 h-full bg-white border-r hidden md:flex flex-col justify-between p-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              isActive(item.path)
                ? 'bg-gray-100 text-blue-600 font-semibold'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="text-xs text-gray-400 px-3 mt-4">© 2025 SignMoney</div>
    </aside>
  );
};

export default Sidebar;
