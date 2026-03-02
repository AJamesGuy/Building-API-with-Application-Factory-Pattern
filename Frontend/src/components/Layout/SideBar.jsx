// src/components/Layout/SideBar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/customers', label: 'Customers', icon: '👥' },
    { path: '/mechanics', label: 'Mechanics', icon: '🔧' },
    { path: '/parts', label: 'Parts', icon: '⚙️' },
    { path: '/service-tickets', label: 'Service Tickets', icon: '📋' },
  ];

  return (
    <div className="bg-gray-800 w-64 h-screen shadow-lg border-r border-gray-700 fixed left-0 top-16 z-40">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Navigation</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition duration-200 ${
                location.pathname === item.path
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideBar;