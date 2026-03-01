// src/pages/Mechanics.jsx
import React, { useState, useEffect } from 'react';
import { getMechanics, createMechanic, updateMechanic, deleteMechanic } from '../services/api';
import MechanicForm from '../components/Form/MechanicForm';
import MechanicCard from '../components/Display/MechanicCard';
import MechanicRankingCard from '../components/Display/MechanicRankingCard';
import Modal from '../components/Utility/Modal';
import '../styles/Mechanics.css';

const Mechanics = () => {
  const [mechanics, setMechanics] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [activeTab, setActiveTab] = useState('list');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMechanics();
    fetchRankings();
  }, []);

  const fetchMechanics = async () => {
    setLoading(true);
    try {
      const { data } = await getMechanics();
      setMechanics(data || []);
    } catch (err) {
      console.error('Error fetching mechanics:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRankings = async () => {
    try {
      const { data } = await getMechanicRankings();
      setRankings(data || []);
    } catch (err) {
      console.error('Error fetching rankings:', err);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createMechanic(data);
      fetchMechanics();
      setShowModal(false);
    } catch (err) {
      console.error('Error creating mechanic:', err);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateMechanic(selectedMechanic.id, data);
      fetchMechanics();
      setShowModal(false);
      setSelectedMechanic(null);
    } catch (err) {
      console.error('Error updating mechanic:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this mechanic?')) {
      try {
        await deleteMechanic(id);
        fetchMechanics();
      } catch (err) {
        console.error('Error deleting mechanic:', err);
      }
    }
  };

  const openCreateModal = () => {
    setSelectedMechanic(null);
    setShowModal(true);
  };

  const openEditModal = (mechanic) => {
    setSelectedMechanic(mechanic);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#092327' }}>
      <div className="container px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Mechanics</h1>
              <p className="text-gray-300">Manage your mechanic team</p>
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
                Add Mechanic
              </span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg max-w-md">
            <button
              onClick={() => setActiveTab('list')}
              className={`flex-1 px-4 py-3 rounded-md font-semibold transition-all duration-300 ${
                activeTab === 'list'
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
              style={activeTab === 'list' ? { backgroundColor: '#0B5351' } : {}}
            >
              Mechanics List
            </button>
            <button
              onClick={() => setActiveTab('rankings')}
              className={`flex-1 px-4 py-3 rounded-md font-semibold transition-all duration-300 ${
                activeTab === 'rankings'
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
              style={activeTab === 'rankings' ? { backgroundColor: '#0B5351' } : {}}
            >
              Rankings
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 shadow-lg animate-pulse">
                  <div className="h-4 bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              ))
            ) : mechanics.length > 0 ? (
              mechanics.map((mechanic) => (
                <MechanicCard
                  key={mechanic.id}
                  mechanic={mechanic}
                  onEdit={() => openEditModal(mechanic)}
                  onDelete={() => handleDelete(mechanic.id)}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No mechanics found</h3>
                <p className="text-gray-500 text-center">Get started by adding your first mechanic</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rankings.length > 0 ? (
              rankings.map((mechanic, index) => (
                <MechanicRankingCard
                  key={mechanic.id}
                  mechanic={mechanic}
                  rank={index + 1}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No rankings available</h3>
                <p className="text-gray-500 text-center">Rankings will appear once mechanics have service tickets</p>
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              {selectedMechanic ? 'Edit Mechanic' : 'Add New Mechanic'}
            </h2>
            <MechanicForm
              initialData={selectedMechanic}
              onSubmit={selectedMechanic ? handleUpdate : handleCreate}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Mechanics;