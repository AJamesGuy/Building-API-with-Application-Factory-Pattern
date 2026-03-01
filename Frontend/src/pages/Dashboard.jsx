// src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import NavBar from '../components/Layout/NavBar';
import SideBar from '../components/Layout/SideBar';
import Footer from '../components/Layout/Footer';

const Dashboard = () => {
  const { role } = useContext(AuthContext);

  return (
    <div>
      <NavBar />
      <SideBar />
      <h1>{role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard` : 'Welcome'}</h1>
      {/* Role-based content */}
      <Footer />
    </div>
  );
};

export default Dashboard;