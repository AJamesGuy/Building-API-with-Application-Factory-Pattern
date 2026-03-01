// src/components/Display/ServiceTicketCard.jsx
import React, { useState } from 'react';

const ServiceTicketCard = ({ ticket, onAssignMechanic, onRemoveMechanic, onAddPart }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (ticket) => {
    // Simple status logic based on mechanics assigned and parts
    if (ticket.mechanics && ticket.mechanics.length > 0) {
      return '#0B5351'; // Active/In Progress
    }
    return '#6A7062'; // Pending
  };

  const getStatusText = (ticket) => {
    if (ticket.mechanics && ticket.mechanics.length > 0) {
      return 'In Progress';
    }
    return 'Pending';
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-white">
                Ticket #{ticket.id}
              </h3>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: getStatusColor(ticket) }}
              >
                {getStatusText(ticket)}
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              Customer: {ticket.customer ? `${ticket.customer.first_name} ${ticket.customer.last_name}` : 'Unknown'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">${ticket.total_cost}</p>
            <p className="text-gray-400 text-sm">Total Cost</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Service Description
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            {ticket.service_desc}
          </p>
        </div>

        {/* Mechanics Section */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Assigned Mechanics ({ticket.mechanics ? ticket.mechanics.length : 0})
          </h4>
          {ticket.mechanics && ticket.mechanics.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {ticket.mechanics.map((mechanic) => (
                <div
                  key={mechanic.id}
                  className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg"
                >
                  <span className="text-sm text-gray-300">
                    {mechanic.first_name} {mechanic.last_name}
                  </span>
                  <button
                    onClick={() => onRemoveMechanic(mechanic.id)}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">No mechanics assigned</p>
          )}
        </div>

        {/* Parts Section */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Parts Used ({ticket.parts ? ticket.parts.length : 0})
          </h4>
          {ticket.parts && ticket.parts.length > 0 ? (
            <div className="space-y-2">
              {ticket.parts.map((part) => (
                <div key={part.id} className="flex items-center justify-between bg-gray-700 px-3 py-2 rounded-lg">
                  <span className="text-sm text-gray-300">{part.desc?.name || 'Unknown Part'}</span>
                  <span className="text-sm text-gray-400">${part.desc?.price || '0.00'}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">No parts added</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-700">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showDetails ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
            </svg>
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>

          <button
            onClick={() => {/* TODO: Implement assign mechanic modal */}}
            className="flex items-center gap-2 px-4 py-2 bg-[#0B5351] text-white rounded-lg hover:bg-[#0A4A46] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Assign Mechanic
          </button>

          <button
            onClick={() => {/* TODO: Implement add part modal */}}
            className="flex items-center gap-2 px-4 py-2 bg-[#6A7062] text-white rounded-lg hover:bg-[#5A6052] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            Add Part
          </button>
        </div>

        {/* Expanded Details */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Customer Details
                </h5>
                <div className="space-y-1 text-sm text-gray-300">
                  <p><span className="text-gray-400">Name:</span> {ticket.customer ? `${ticket.customer.first_name} ${ticket.customer.last_name}` : 'N/A'}</p>
                  <p><span className="text-gray-400">Email:</span> {ticket.customer?.email || 'N/A'}</p>
                  <p><span className="text-gray-400">Phone:</span> {ticket.customer?.phone || 'N/A'}</p>
                </div>
              </div>
              <div>
                <h5 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Ticket Info
                </h5>
                <div className="space-y-1 text-sm text-gray-300">
                  <p><span className="text-gray-400">ID:</span> {ticket.id}</p>
                  <p><span className="text-gray-400">Status:</span> {getStatusText(ticket)}</p>
                  <p><span className="text-gray-400">Total Cost:</span> ${ticket.total_cost}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceTicketCard;