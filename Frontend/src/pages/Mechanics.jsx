// src/pages/Mechanics.jsx
import React, { useState, useEffect } from 'react';
import { getMechanics, createMechanic, updateMechanic, deleteMechanic, getMyTickets, getRankings } from '../services/api';
import MechanicForm from '../components/Form/MechanicForm';
import MechanicCard from '../components/Display/MechanicCard';
import MechanicTicketCard from '../components/Display/MechanicTicketCard';
import MechanicRankingCard from '../components/Display/MechanicRankIngCard';
import Modal from '../components/Utility/Modal';
import Table from '../components/Utility/Table';

const Mechanics = () => {
  const [mechanics, setMechanics] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMechanics();
    fetchRankings();
  }, []);

  const fetchMechanics = async () => {
    try {
      const { data } = await getMechanics();
      setMechanics(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRankings = async () => {
    try {
      const { data } = await getRankings();
      setRankings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTickets = async (id) => {
    try {
      const { data } = await getMyTickets(id);
      setTickets(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (data) => {
    await createMechanic(data);
    fetchMechanics();
    setShowModal(false);
  };

  const handleUpdate = async (data) => {
    await updateMechanic(selectedMechanic.id, data);
    fetchMechanics();
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    await deleteMechanic(id);
    fetchMechanics();
  };

  return (
    <div>
      <h1>Mechanics</h1>
      <button onClick={() => { setSelectedMechanic(null); setShowModal(true); }}>Create Mechanic</button>
      <Table data={mechanics} columns={['id', 'first_name', 'last_name', 'email', 'address', 'schedule', 'salary']} 
             onEdit={(mech) => { setSelectedMechanic(mech); setShowModal(true); }}
             onDelete={handleDelete}
             onViewTickets={(mech) => fetchTickets(mech.id)} />
      {tickets.length > 0 && (
        <div>
          <h2>Tickets</h2>
          {tickets.map((ticket) => <MechanicTicketCard key={ticket.id} ticket={ticket} />)}
        </div>
      )}
      <h2>Rankings</h2>
      {rankings.map((ranking) => <MechanicRankingCard key={ranking.id} ranking={ranking} />)}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <MechanicForm onSubmit={selectedMechanic ? handleUpdate : handleCreate} initialData={selectedMechanic} />
      </Modal>
    </div>
  );
};

export default Mechanics;