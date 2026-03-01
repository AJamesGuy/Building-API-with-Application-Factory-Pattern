// src/components/Layout/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavBar = () => {
  const { logout } = useAuth();

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/customers">Customers</Link>
      <Link to="/mechanics">Mechanics</Link>
      <Link to="/parts">Parts</Link>
      <Link to="/service-tickets">Service Tickets</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default NavBar;