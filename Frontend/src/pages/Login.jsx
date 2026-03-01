// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/Form/LoginForm';

const Login = () => {
  const { login } = useAuth();
  const [isCustomer, setIsCustomer] = useState(true);

  const handleLogin = async (credentials) => {
    await login(credentials, isCustomer);
    // Redirect based on role
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => setIsCustomer(!isCustomer)}>
        Switch to {isCustomer ? 'Mechanic' : 'Customer'} Login
      </button>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;