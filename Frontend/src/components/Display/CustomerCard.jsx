// src/components/Display/CustomerCard.jsx
import React from 'react';

const CustomerCard = ({ customer, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">
              {customer.first_name} {customer.last_name}
            </h3>
            <p className="text-gray-400 text-sm">{customer.email}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-[#0B5351] hover:bg-gray-700 rounded-lg transition-colors duration-200"
              title="Edit Customer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              title="Delete Customer"
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
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-gray-300 text-sm">{customer.phone}</span>
          </div>

          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-300 text-sm leading-relaxed">{customer.address}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#0B5351]">{customer.service_tickets?.length || 0}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Service Tickets</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#6A7062]">$0.00</p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Total Spent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;