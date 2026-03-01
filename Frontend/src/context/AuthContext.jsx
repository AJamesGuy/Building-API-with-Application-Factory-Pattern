// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { loginCustomer, loginMechanic } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role')); // 'customer' or 'mechanic'

  useEffect(() => {
    if (token) {
      // Optionally fetch user details
    }
  }, [token]);

  const login = async (credentials, isCustomer = true) => {
    try {
      const { data } = isCustomer ? await loginCustomer(credentials) : await loginMechanic(credentials);
      setToken(data.token);
      setUser({ name: data.message.split(' ')[1] }); // Extract name from message
      setRole(isCustomer ? 'customer' : 'mechanic');
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', isCustomer ? 'customer' : 'mechanic');
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);