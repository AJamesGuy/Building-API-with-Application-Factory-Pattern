// src/pages/ServiceTickets.jsx
import React, { useState, useEffect } from 'react';
import { getServiceTickets, createServiceTicket, assignMechanicToTicket, removeMechanicFromTicket, addPartToTicket } from '../services/api';
import ServiceTicketForm from '../components/Form/ServiceTicketForm';
import ServiceTicketCard from '../components/Display/ServiceTicketCard';
import Modal from '../components/Utility/Modal';
import '../styles/ServiceTickets.css';

const ServiceTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const { data } = await getServiceTickets();
      setTickets(data || []);
    } catch (err) {
      console.error('Error fetching service tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createServiceTicket(data);
      fetchTickets();
      setShowModal(false);
    } catch (err) {
      console.error('Error creating service ticket:', err);
    }
  };

  const handleAssignMechanic = async (ticketId, mechanicId) => {
    try {
      await assignMechanicToTicket(ticketId, mechanicId);
      fetchTickets();
    } catch (err) {
      console.error('Error assigning mechanic:', err);
    }
  };

  const handleRemoveMechanic = async (ticketId, mechanicId) => {
    try {
      await removeMechanicFromTicket(ticketId, mechanicId);
      fetchTickets();
    } catch (err) {
      console.error('Error removing mechanic:', err);
    }
  };

  const handleAddPart = async (ticketId, partId) => {
    try {
      await addPartToTicket(ticketId, partId);
      fetchTickets();
    } catch (err) {
      console.error('Error adding part:', err);
    }
  };

  const openCreateModal = () => {
    setSelectedTicket(null);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#092327' }}>
      <div className="container px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Service Tickets</h1>
              <p className="text-gray-300">Manage service requests and assignments</p>
            </div>
            <button
              onClick={openCreateModal}
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              style={{ backgroundColor: '#0B5351' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#6A7062'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#0B5351'}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Ticket
              </span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Total Tickets</p>
                <p className="text-3xl font-bold text-white mt-2">{tickets.length}</p>
              </div>
              <div className="p-3 rounded-full" style={{ backgroundColor: '#0B5351' }}>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Pending</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {tickets.filter(ticket => ticket.status === 'pending').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-600">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">In Progress</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {tickets.filter(ticket => ticket.status === 'in_progress').length}
                </p>
              </div>
              <div className="p-3 rounded-full" style={{ backgroundColor: '#6A7062' }}>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Completed</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {tickets.filter(ticket => ticket.status === 'completed').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-600">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 shadow-lg animate-pulse border border-gray-700">
                <div className="h-4 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            ))
          ) : tickets.length > 0 ? (
            tickets.map((ticket) => (
              <ServiceTicketCard
                key={ticket.id}
                ticket={ticket}
                onAssignMechanic={(mechanicId) => handleAssignMechanic(ticket.id, mechanicId)}
                onRemoveMechanic={(mechanicId) => handleRemoveMechanic(ticket.id, mechanicId)}
                onAddPart={(partId) => handleAddPart(ticket.id, partId)}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No service tickets found</h3>
              <p className="text-gray-500 text-center">Get started by creating your first service ticket</p>
            </div>
          )}
        </div>

        {/* Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Create New Service Ticket
            </h2>
            <ServiceTicketForm
              onSubmit={handleCreate}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ServiceTickets;