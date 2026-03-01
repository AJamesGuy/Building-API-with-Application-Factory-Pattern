// src/pages/Parts.jsx
import React, { useState, useEffect } from 'react';
import { createPart, getParts, updatePart, deletePart, addPartDescription } from '../services/api';
import PartForm from '../components/Form/PartForm';
import InventoryForm from '../components/Form/InventoryForm';
import PartCard from '../components/Display/PartCard';
import Modal from '../components/Utility/Modal';
import Table from '../components/Utility/Table';

const Parts = () => {
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDescModal, setShowDescModal] = useState(false);

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      const { data } = await getParts();
      setParts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (data) => {
    await createPart(data);
    fetchParts();
    setShowModal(false);
  };

  const handleUpdate = async (data) => {
    await updatePart(selectedPart.id, data);
    fetchParts();
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    await deletePart(id);
    fetchParts();
  };

  const handleAddDescription = async (data) => {
    await addPartDescription(selectedPart.id, data);
    fetchParts();
    setShowDescModal(false);
  };

  return (
    <div>
      <h1>Parts</h1>
      <button onClick={() => { setSelectedPart(null); setShowModal(true); }}>Create Part</button>
      <Table data={parts} columns={['id', 'desc_id', 'name', 'serial_num']} 
             onEdit={(part) => { setSelectedPart(part); setShowModal(true); }}
             onDelete={handleDelete}
             onAddDesc={(part) => { setSelectedPart(part); setShowDescModal(true); }} />
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <PartForm onSubmit={selectedPart ? handleUpdate : handleCreate} initialData={selectedPart} />
      </Modal>
      <Modal show={showDescModal} onClose={() => setShowDescModal(false)}>
        <InventoryForm onSubmit={handleAddDescription} />
      </Modal>
    </div>
  );
};

export default Parts;