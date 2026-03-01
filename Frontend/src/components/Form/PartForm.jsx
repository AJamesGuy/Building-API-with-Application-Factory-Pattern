// src/components/Form/PartForm.jsx
import React, { useState, useEffect } from 'react';

const PartForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    serial_num: '',
    description: '',
    price: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        serial_num: initialData.serial_num || '',
        description: initialData.desc?.description || '',
        price: initialData.desc?.price || ''
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
      // For now, we'll submit the data as is
      // The backend should handle creating/updating the inventory description
      const submitData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null
      };
      await onSubmit(submitData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Part Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-semibold text-gray-300 tracking-wide">
          Part Name
        </label>
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] focus:border-[#0B5351] transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
            placeholder="Brake Pad Set"
          />
        </div>
      </div>

      {/* Serial Number */}
      <div className="space-y-2">
        <label htmlFor="serial_num" className="block text-sm font-semibold text-gray-300 tracking-wide">
          Serial Number
        </label>
        <div className="relative">
          <input
            type="text"
            id="serial_num"
            name="serial_num"
            value={formData.serial_num}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] focus:border-[#0B5351] transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
            placeholder="SN123456789"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-semibold text-gray-300 tracking-wide">
          Description
        </label>
        <div className="relative">
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] focus:border-[#0B5351] transition-all duration-300 bg-gray-700 text-white placeholder-gray-400 resize-none"
            placeholder="Detailed description of the part..."
          />
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <label htmlFor="price" className="block text-sm font-semibold text-gray-300 tracking-wide">
          Price ($)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400 text-sm">$</span>
          </div>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full pl-8 pr-4 py-3 border-2 border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B5351] focus:border-[#0B5351] transition-all duration-300 bg-gray-700 text-white placeholder-gray-400"
            placeholder="49.99"
          />
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
            initialData ? 'Update Part' : 'Create Part'
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

export default PartForm;