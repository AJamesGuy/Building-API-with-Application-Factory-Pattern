// src/components/Form/MechanicForm.jsx
import React, { useState, useEffect } from 'react';

const MechanicForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
    schedule: '',
    salary: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        first_name: initialData.first_name || '',
        last_name: initialData.last_name || '',
        email: initialData.email || '',
        password: '', // Don't populate password for security
        address: initialData.address || '',
        schedule: initialData.schedule || '',
        salary: initialData.salary || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Convert salary to float and remove password if empty
      const submitData = {
        ...formData,
        salary: formData.salary ? parseFloat(formData.salary) : null
      };
      if (!submitData.password) {
        delete submitData.password;
      }
      await onSubmit(submitData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <label htmlFor="first_name" className="block text-sm font-semibold text-gray-300 tracking-wide">
            First Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] focus:border-[#0B5351] transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
              placeholder="John"
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label htmlFor="last_name" className="block text-sm font-semibold text-gray-300 tracking-wide">
            Last Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] focus:border-[#0B5351] transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
              placeholder="Smith"
            />
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-300 tracking-wide">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] focus:border-[#0B5351] transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
            placeholder="john.smith@example.com"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-semibold text-gray-300 tracking-wide">
          Password {initialData ? '(Leave blank to keep current)' : ''}
        </label>
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!initialData}
            className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] focus:border-[#0B5351] transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
            placeholder={initialData ? 'Enter new password' : 'Enter password'}
          />
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label htmlFor="address" className="block text-sm font-semibold text-gray-300 tracking-wide">
          Address
        </label>
        <div className="relative">
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] focus:border-[#0B5351] transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
            placeholder="123 Main St, City, State"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Schedule */}
        <div className="space-y-2">
          <label htmlFor="schedule" className="block text-sm font-semibold text-gray-300 tracking-wide">
            Schedule
          </label>
          <div className="relative">
            <input
              type="text"
              id="schedule"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] focus:border-[#0B5351] transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
              placeholder="Mon-Fri 9AM-5PM"
            />
          </div>
        </div>

        {/* Salary */}
        <div className="space-y-2">
          <label htmlFor="salary" className="block text-sm font-semibold text-gray-300 tracking-wide">
            Salary ($)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-sm">$</span>
            </div>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full pl-8 pr-4 py-3 border-2 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] focus:border-[#0B5351] transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
              placeholder="50000.00"
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-600">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[#0B5351] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#0A4A46] focus:outline-none focus:ring-2 focus:ring-[#0B5351] focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {initialData ? 'Updating...' : 'Creating...'}
            </div>
          ) : (
            initialData ? 'Update Mechanic' : 'Create Mechanic'
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

export default MechanicForm;