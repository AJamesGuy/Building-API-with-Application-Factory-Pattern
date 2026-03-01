// src/services/api.js
import axios from 'axios';

// Determine base URL - use local development server as backup
const getBaseURL = () => {
  // Try production URL first, fallback to local development server
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  return isProduction ? 'https://my-mechanics.onrender.com' : 'http://127.0.0.1:5000';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication helper
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// ========== CUSTOMER APIs ==========

export const loginCustomer = (credentials) => api.post('/customers/login', credentials);
export const createCustomer = (data) => api.post('/customers/', data);
export const getCustomers = (page = 1, perPage = 10) =>
  api.get(`/customers/read-customers?page=${page}&per_page=${perPage}`);
export const updateCustomer = (id, data) => api.put(`/customers/${id}/update-customer`, data);
export const deleteCustomer = (id) => api.delete(`/customers/${id}/delete-customer`);
export const searchCustomer = (email) => api.get('/customers/search-customer', { data: { email } });

// ========== MECHANIC APIs ==========

export const loginMechanic = (credentials) => api.post('/mechanics/login', credentials);
export const createMechanic = (data) => api.post('/mechanics/create-mechanic', data);
export const getMechanics = () => api.get('/mechanics/read-mechanics');
export const updateMechanic = (id, data) => api.put(`/mechanics/${id}/update-mechanic`, data);
export const deleteMechanic = (id) => api.delete(`/mechanics/${id}/delete-mechanic`);
export const getMechanicTickets = (id) => api.get(`/mechanics/${id}/my-tickets`);
export const getMechanicRankings = () => api.get('/mechanics/rankings/by-tickets');

// ========== PART APIs ==========

export const createPart = (data) => api.post('/parts/', data);
export const getParts = () => api.get('/parts/get-parts');
export const updatePart = (id, data) => api.put(`/parts/${id}/update-part`, data);
export const deletePart = (id) => api.delete(`/parts/${id}/delete-part`);
export const addPartDescription = (partId, data) => api.put(`/part-descriptions/${partId}/add-description`, data);

// ========== SERVICE TICKET APIs ==========

export const createServiceTicket = (data) => api.post('/service-tickets/', data);
export const getServiceTickets = () => api.get('/service-tickets/get-tickets');
export const assignMechanicToTicket = (ticketId, mechanicId) =>
  api.put(`/service-tickets/${ticketId}/assign-mechanic/${mechanicId}`);
export const removeMechanicFromTicket = (ticketId, mechanicId) =>
  api.put(`/service-tickets/${ticketId}/remove-mechanic/${mechanicId}`);
export const addPartToTicket = (ticketId, partId) =>
  api.post(`/service-tickets/${ticketId}/add-part/${partId}`);

// ========== UTILITY FUNCTIONS ==========

// Store mechanic data in localStorage
export const storeMechanicData = (data) => {
  try {
    localStorage.setItem('mechanicData', JSON.stringify(data));
  } catch (error) {
    console.error('Error storing mechanic data:', error);
  }
};

// Retrieve mechanic data from localStorage
export const getStoredMechanicData = () => {
  try {
    const data = localStorage.getItem('mechanicData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving stored mechanic data:', error);
    return null;
  }
};

// Clear all stored data
export const clearStoredData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('mechanicData');
};

export default api;