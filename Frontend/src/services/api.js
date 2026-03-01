// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://my-mechanics.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Customer APIs
export const loginCustomer = (credentials) => api.post('/customers/login', credentials);
export const createCustomer = (data) => api.post('/customers', data);
export const getCustomers = (page = 1, per_page = 10) => api.get(`/customers/read-customers?page=${page}&per_page=${per_page}`);
export const updateCustomer = (id, data) => api.put(`/customers/${id}/update-customer`, data);
export const deleteCustomer = (id) => api.delete(`/customers/${id}/delete-customer`);
export const searchCustomer = (email) => api.get(`/customers/search-customer?email=${email}`); // Assuming query param, as GET with body is invalid

// Mechanic APIs
export const loginMechanic = (credentials) => api.post('/mechanics/login', credentials);
export const createMechanic = (data) => api.post('/mechanics/create-mechanic', data);
export const getMechanics = () => api.get('/mechanics/read-mechanics');
export const updateMechanic = (id, data) => api.put(`/mechanics/${id}/update-mechanic`, data);
export const deleteMechanic = (id) => api.delete(`/mechanics/${id}/delete-mechanic`);
export const getMyTickets = (id) => api.get(`/mechanics/${id}/my-tickets`);
export const getRankings = () => api.get('/mechanics/rankings/by-tickets');

// Part APIs
export const createPart = (data) => api.post('/parts/', data);
export const getParts = () => api.get('/parts/');
export const updatePart = (id, data) => api.put(`/parts/${id}/update-part`, data);
export const deletePart = (id) => api.delete(`/parts/${id}/delete-part`);
export const addPartDescription = (partId, data) => api.put(`/part-descriptions/${partId}/add-description`, data);

// Service Ticket APIs
export const createServiceTicket = (data) => api.post('/service-tickets/', data);
export const getServiceTickets = () => api.get('/service-tickets/');
export const assignMechanicToTicket = (ticketId, mechanicId) => api.put(`/service-tickets/${ticketId}/assign-mechanic/${mechanicId}`);
export const removeMechanicFromTicket = (ticketId, mechanicId) => api.put(`/service-tickets/${ticketId}/remove-mechanic/${mechanicId}`);
export const addPartToTicket = (ticketId, partId) => api.post(`/service-tickets/${ticketId}/add-part/${partId}`);
export const getStoredMechanicData = () => {
  try {
    const data = localStorage.getItem('mechanicData');
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Error retrieving stored mechanic data:', err);
    return null;
  }
};
export default api;