// src/pages/Parts.jsx
import React, { useState, useEffect } from 'react';
import { getParts, createPart, updatePart, deletePart, addPartDescription } from '../services/api';
import PartForm from '../components/Form/PartForm';
import PartCard from '../components/Display/PartCard';
import Modal from '../components/Utility/Modal';
import '../styles/Parts.css';

const Parts = () => {
  const [parts, setParts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    setLoading(true);
    try {
      const { data } = await getParts();
      setParts(data || []);
    } catch (err) {
      console.error('Error fetching parts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createPart(data);
      fetchParts();
      setShowModal(false);
    } catch (err) {
      console.error('Error creating part:', err);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updatePart(selectedPart.id, data);
      fetchParts();
      setShowModal(false);
      setSelectedPart(null);
    } catch (err) {
      console.error('Error updating part:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this part?')) {
      try {
        await deletePart(id);
        fetchParts();
      } catch (err) {
        console.error('Error deleting part:', err);
      }
    }
  };

  const handleAddDescription = async (partId, description) => {
    try {
      await addPartDescription(partId, { description });
      fetchParts();
    } catch (err) {
      console.error('Error adding description:', err);
    }
  };

  const openCreateModal = () => {
    setSelectedPart(null);
    setShowModal(true);
  };

  const openEditModal = (part) => {
    setSelectedPart(part);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#092327' }}>
      <div className="container px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Parts Inventory</h1>
              <p className="text-gray-300">Manage your parts and inventory</p>
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
                Add Part
              </span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Total Parts</p>
                <p className="text-3xl font-bold text-white mt-2">{parts.length}</p>
              </div>
              <div className="p-3 rounded-full" style={{ backgroundColor: '#0B5351' }}>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">In Stock</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {parts.filter(part => part.quantity > 0).length}
                </p>
              </div>
              <div className="p-3 rounded-full" style={{ backgroundColor: '#6A7062' }}>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Low Stock</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {parts.filter(part => part.quantity <= 5).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-600">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 shadow-lg animate-pulse border border-gray-700">
                <div className="h-4 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            ))
          ) : parts.length > 0 ? (
            parts.map((part) => (
              <PartCard
                key={part.id}
                part={part}
                onEdit={() => openEditModal(part)}
                onDelete={() => handleDelete(part.id)}
                onAddDescription={(description) => handleAddDescription(part.id, description)}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No parts found</h3>
              <p className="text-gray-500 text-center">Get started by adding your first part to inventory</p>
            </div>
          )}
        </div>

        {/* Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              {selectedPart ? 'Edit Part' : 'Add New Part'}
            </h2>
            <PartForm
              initialData={selectedPart}
              onSubmit={selectedPart ? handleUpdate : handleCreate}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Parts;