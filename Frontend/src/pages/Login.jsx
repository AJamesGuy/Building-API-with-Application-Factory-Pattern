// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginCustomer, loginMechanic } from '../services/api';
import LoginForm from '../components/Form/LoginForm';
import '../styles/Login.css';

const Login = () => {
  const [isCustomer, setIsCustomer] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      setError('');
      const response = isCustomer
        ? await loginCustomer(credentials)
        : await loginMechanic(credentials);

      // Store token, role, and user ID in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', isCustomer ? 'customer' : 'mechanic');
      
      // Store user ID for the logged-in user
      if (response.data.id) {
        if (isCustomer) {
          localStorage.setItem('customerId', response.data.id);
        } else {
          localStorage.setItem('mechanicId', response.data.id);
        }
      }

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Sign in to your account</h1>
          <p>Access the Mechanic Management System</p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800 py-8 px-6 shadow-2xl sm:rounded-xl sm:px-10 border border-gray-700">
          {/* User Type Toggle */}
          <div className="mb-8">
            <div className="user-type-selector">
              <button
                type="button"
                onClick={() => setIsCustomer(true)}
                className={`user-type-btn ${isCustomer ? 'active' : ''}`}
              >
                Customer Login
              </button>
              <button
                type="button"
                onClick={() => setIsCustomer(false)}
                className={`user-type-btn ${!isCustomer ? 'active' : ''}`}
              >
                Mechanic Login
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <LoginForm onSubmit={handleLogin} isCustomer={isCustomer} />

          {/* Sign Up Links */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-800 text-gray-400 font-medium">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Link
                to="/signup/customer"
                className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-gray-600 rounded-lg shadow-sm bg-gray-700 text-sm font-semibold text-gray-300 hover:bg-gray-600 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B5351] transition-all duration-300"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Sign up as Customer
              </Link>
              <Link
                to="/signup/mechanic"
                className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-gray-600 rounded-lg shadow-sm bg-gray-700 text-sm font-semibold text-gray-300 hover:bg-gray-600 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B5351] transition-all duration-300"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Sign up as Mechanic
              </Link>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;