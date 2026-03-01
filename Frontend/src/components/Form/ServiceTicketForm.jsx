// src/components/Form/ServiceTicketForm.jsx
import React, { useState, useEffect } from 'react';
import { getCustomers } from '../../services/api';

const ServiceTicketForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    customer_id: '',
    service_desc: '',
    total_cost: ''
  });
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customersLoading, setCustomersLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data } = await getCustomers();
      setCustomers(data || []);
    } catch (err) {
      console.error('Error fetching customers:', err);
    } finally {
      setCustomersLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Convert total_cost to float
      const submitData = {
        ...formData,
        customer_id: parseInt(formData.customer_id),
        total_cost: parseFloat(formData.total_cost)
      };
      await onSubmit(submitData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Selection */}
      <div className="space-y-2">
        <label htmlFor="customer_id" className="block text-sm font-semibold text-gray-300 tracking-wide">
          Customer
        </label>
        <div className="relative">
          <select
            id="customer_id"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            required
            disabled={customersLoading}
            className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] focus:border-[#0B5351] transition-all duration-300 bg-gray-700 text-white placeholder-gray-400 disabled:opacity-50"
          >
            <option value="">
              {customersLoading ? 'Loading customers...' : 'Select a customer'}
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.first_name} {customer.last_name} - {customer.email}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Service Description */}
      <div className="space-y-2">
        <label htmlFor="service_desc" className="block text-sm font-semibold text-gray-300 tracking-wide">
          Service Description
        </label>
        <div className="relative">
          <textarea
            id="service_desc"
            name="service_desc"
            value={formData.service_desc}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] focus:border-[#0B5351] transition-all duration-300 bg-gray-700 text-white placeholder-gray-400 resize-none"
            placeholder="Describe the service required..."
          />
        </div>
      </div>

      {/* Total Cost */}
      <div className="space-y-2">
        <label htmlFor="total_cost" className="block text-sm font-semibold text-gray-300 tracking-wide">
          Total Cost ($)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400 text-sm">$</span>
          </div>
          <input
            type="number"
            id="total_cost"
            name="total_cost"
            value={formData.total_cost}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full pl-8 pr-4 py-3 border-2 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] focus:border-[#0B5351] transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-600">
        <button
          type="submit"
          disabled={loading || customersLoading}
          className="flex-1 bg-[#0B5351] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#0A4A46] focus:outline-none focus:ring-2 focus:ring-[#0B5351] focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </div>
          ) : (
            'Create Service Ticket'
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ServiceTicketForm;