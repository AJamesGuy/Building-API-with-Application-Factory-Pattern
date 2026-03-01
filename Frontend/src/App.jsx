import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Layout Components
import NavBar from './components/Layout/NavBar';
import Footer from './components/Layout/Footer';
import SideBar from './components/Layout/SideBar';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Mechanics from './pages/Mechanics';
import Customers from './pages/Customers';
import Parts from './pages/Parts';
import ServiceTickets from './pages/ServiceTickets';

// Services
import { isAuthenticated, getStoredMechanicData } from './services/api';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const authenticated = isAuthenticated();
  return authenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [mechanicData, setMechanicData] = useState(null);

  useEffect(() => {
    // Check authentication on mount
    if (isAuthenticated()) {
      setAuthenticated(true);
      const data = getStoredMechanicData();
      setMechanicData(data);
    }
  }, []);

  const handleLogin = (token, mechanic) => {
    setAuthenticated(true);
    setMechanicData(mechanic);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setMechanicData(null);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {authenticated && <NavBar mechanic={mechanicData} onLogout={handleLogout} />}
        
        <div className="main-content">
          {authenticated && <SideBar />}
          
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            
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
              path="/mechanics" 
              element={
                <ProtectedRoute>
                  <Mechanics mechanic={mechanicData} onLogout={handleLogout} />
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
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        
        {authenticated && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
