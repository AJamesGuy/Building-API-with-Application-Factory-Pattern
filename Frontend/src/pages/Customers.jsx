// src/pages/Customers.jsx
import React, { useState, useEffect } from 'react';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer, searchCustomer } from '../services/api';
import CustomerForm from '../components/Form/CustomerForm';
import CustomerCard from '../components/Display/CustomerCard';
import Pagination from '../components/Utility/Pagination';
import Modal from '../components/Utility/Modal';
import '../styles/Customers.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, [page, perPage]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { data } = await getCustomers(page, perPage);
      setCustomers(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createCustomer(data);
      fetchCustomers();
      setShowModal(false);
    } catch (err) {
      console.error('Error creating customer:', err);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateCustomer(selectedCustomer.id, data);
      fetchCustomers();
      setShowModal(false);
      setSelectedCustomer(null);
    } catch (err) {
      console.error('Error updating customer:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(id);
        fetchCustomers();
      } catch (err) {
        console.error('Error deleting customer:', err);
      }
    }
  };

  const handleSearch = async () => {
    if (!searchEmail.trim()) {
      fetchCustomers();
      return;
    }
    try {
      const { data } = await searchCustomer(searchEmail);
      setCustomers([data]);
      setTotal(1);
    } catch (err) {
      console.error('Error searching customer:', err);
      setCustomers([]);
      setTotal(0);
    }
  };

  const openCreateModal = () => {
    setSelectedCustomer(null);
    setShowModal(true);
  };

  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  return (
    <div className="customers-container">
      <div className="container px-4 py-8">
        {/* Header Section */}
        <div className="customers-header">
          <div className="customers-header-content">
            <h1>Customers</h1>
            <p>Manage your customer database</p>
          </div>
          <button
            onClick={openCreateModal}
            className="add-customer-btn"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Customer
          </button>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-form">
            <input
              type="email"
              placeholder="Search by email..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="search-input"
            />
            <button
              onClick={handleSearch}
              className="search-btn"
            >
              Search
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="customers-grid">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="loading-skeleton">
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
              </div>
            ))
          ) : customers.length > 0 ? (
            customers.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                onEdit={() => openEditModal(customer)}
                onDelete={() => handleDelete(customer.id)}
              />
            ))
          ) : (
            <div className="empty-state">
              <svg className="empty-state-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3>No customers found</h3>
              <p>Get started by adding your first customer</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {total > perPage && (
          <div className="pagination-container">
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(total / perPage)}
              onPageChange={setPage}
            />
          </div>
        )}

        {/* Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              {selectedCustomer ? 'Edit Customer' : 'Add New Customer'}
            </h2>
            <CustomerForm
              initialData={selectedCustomer}
              onSubmit={selectedCustomer ? handleUpdate : handleCreate}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Customers;