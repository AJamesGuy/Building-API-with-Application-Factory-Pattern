// src/components/Display/PartCard.jsx
import React from 'react';

const PartCard = ({ part, onEdit, onDelete, onAddDescription }) => {
  const getStockStatus = (part) => {
    // This is a simple logic - you might want to add a quantity field to the model
    const stockLevel = part.quantity || Math.floor(Math.random() * 50); // Mock data for now
    if (stockLevel === 0) return { status: 'Out of Stock', color: '#DC2626' };
    if (stockLevel < 10) return { status: 'Low Stock', color: '#F59E0B' };
    return { status: 'In Stock', color: '#10B981' };
  };

  const stockInfo = getStockStatus(part);

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">
              {part.desc?.name || 'Unnamed Part'}
            </h3>
            <p className="text-gray-400 text-sm">Part ID: {part.id}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-[#0B5351] hover:bg-gray-700 rounded-lg transition-colors duration-200"
              title="Edit Part"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              title="Delete Part"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Description */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Description
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            {part.desc?.description || 'No description available'}
          </p>
        </div>

        {/* Price and Stock Status */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-700 rounded-lg">
            <p className="text-xl font-bold text-[#0B5351]">${part.desc?.price || '0.00'}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Price</p>
          </div>
          <div className="text-center p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center justify-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: stockInfo.color }}
              ></div>
              <span className="text-sm font-semibold text-white">{stockInfo.status}</span>
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">Stock Status</p>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Usage Statistics
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-[#6A7062]">{part.service_tickets?.length || 0}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Times Used</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">{part.quantity || Math.floor(Math.random() * 50)}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">In Stock</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-700">
          <button
            onClick={() => onAddDescription('Sample description')}
            className="flex-1 bg-[#0B5351] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#0A4A46] transition-colors duration-200 text-sm"
          >
            Update Description
          </button>
          <button
            onClick={() => {/* TODO: Implement restock functionality */}}
            className="flex-1 bg-[#6A7062] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#5A6052] transition-colors duration-200 text-sm"
          >
            Restock
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartCard;