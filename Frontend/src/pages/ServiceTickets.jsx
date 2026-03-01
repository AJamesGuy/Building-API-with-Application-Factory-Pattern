// src/pages/ServiceTickets.jsx
import React, { useState, useEffect } from 'react';
import { createServiceTicket, getServiceTickets, assignMechanicToTicket, removeMechanicFromTicket, addPartToTicket } from '../services/api';
import ServiceTicketForm from '../components/Form/ServiceTicketForm';
import ServiceTicketCard from '../components/Display/ServiceTicketCard';
import Modal from '../components/Utility/Modal';
import Table from '../components/Utility/Table';

const ServiceTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState(''); // 'assign', 'remove', 'addPart'

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data } = await getServiceTickets();
      setTickets(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (data) => {
    await createServiceTicket(data);
    fetchTickets();
    setShowModal(false);
  };

  const handleAssign = async (mechanicId) => {
    await assignMechanicToTicket(selectedTicket.id, mechanicId);
    fetchTickets();
    setShowModal(false);
  };

  const handleRemove = async (mechanicId) => {
    await removeMechanicFromTicket(selectedTicket.id, mechanicId);
    fetchTickets();
    setShowModal(false);
  };

  const handleAddPart = async (partId) => {
    await addPartToTicket(selectedTicket.id, partId);
    fetchTickets();
    setShowModal(false);
  };

  return (
    <div>
      <h1>Service Tickets</h1>
      <button onClick={() => { setSelectedTicket(null); setShowModal(true); setAction('create'); }}>Create Ticket</button>
      <Table data={tickets} columns={['id', 'customer_id', 'service_desc', 'total_cost']} 
             onAssign={(ticket) => { setSelectedTicket(ticket); setShowModal(true); setAction('assign'); }}
             onRemove={(ticket) => { setSelectedTicket(ticket); setShowModal(true); setAction('remove'); }}
             onAddPart={(ticket) => { setSelectedTicket(ticket); setShowModal(true); setAction('addPart'); }} />
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {action === 'create' && <ServiceTicketForm onSubmit={handleCreate} />}
        {action === 'assign' && <input placeholder="Mechanic ID" onChange={(e) => handleAssign(e.target.value)} />}
        {action === 'remove' && <input placeholder="Mechanic ID" onChange={(e) => handleRemove(e.target.value)} />}
        {action === 'addPart' && <input placeholder="Part ID" onChange={(e) => handleAddPart(e.target.value)} />}
      </Modal>
    </div>
  );
};

export default ServiceTickets;