// src/components/Layout/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ mechanic, onLogout }) => {
  const role = localStorage.getItem('role');

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold">Mechanic Management</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {mechanic && (
              <span className="text-sm text-gray-300">
                Welcome, {mechanic.first_name} {mechanic.last_name}
              </span>
            )}

            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/customers"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Customers
              </Link>
              <Link
                to="/mechanics"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Mechanics
              </Link>
              <Link
                to="/parts"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Parts
              </Link>
              <Link
                to="/service-tickets"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Service Tickets
              </Link>
            </div>

            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;