import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Pages
import Login from './pages/Login';
import CustomerSignup from './pages/CustomerSignup';
import MechanicSignup from './pages/MechanicSignup';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Mechanics from './pages/Mechanics';
import Parts from './pages/Parts';
import ServiceTickets from './pages/ServiceTickets';

// Components
import NavBar from './components/Layout/NavBar';
import SideBar from './components/Layout/SideBar';
import Footer from './components/Layout/Footer';

// Services
import { isAuthenticated } from './services/api';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// Main App Content Component
const AppContent = () => {
  const [mechanicData, setMechanicData] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('mechanicData');
    setMechanicData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated() && <NavBar mechanic={mechanicData} onLogout={handleLogout} />}

      <div className="flex">
        {isAuthenticated() && <SideBar />}

        <main className={`flex-1 ${isAuthenticated() ? 'ml-64 pt-20' : ''} p-6`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup/customer" element={<CustomerSignup />} />
            <Route path="/signup/mechanic" element={<MechanicSignup />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard mechanic={mechanicData} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard mechanic={mechanicData} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mechanics"
              element={
                <ProtectedRoute>
                  <Mechanics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parts"
              element={
                <ProtectedRoute>
                  <Parts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/service-tickets"
              element={
                <ProtectedRoute>
                  <ServiceTickets />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>

      {isAuthenticated() && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
