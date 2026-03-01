// src/pages/Customers.jsx
import React, { useState, useEffect } from 'react';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer, searchCustomer } from '../services/api';
import CustomerForm from '../components/Form/CustomerForm';
import CustomerCard from '../components/Display/CustomerCard';
import Pagination from '../components/Utility/Pagination';
import Modal from '../components/Utility/Modal';
import Table from '../components/Utility/Table';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, [page, perPage]);

  const fetchCustomers = async () => {
    try {
      const { data } = await getCustomers(page, perPage);
      setCustomers(data.items);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (data) => {
    await createCustomer(data);
    fetchCustomers();
    setShowModal(false);
  };

  const handleUpdate = async (data) => {
    await updateCustomer(selectedCustomer.id, data);
    fetchCustomers();
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    fetchCustomers();
  };

  const handleSearch = async () => {
    try {
      const { data } = await searchCustomer(searchEmail);
      setCustomers([data]); // Assuming single result
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Customers</h1>
      <input type="text" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} placeholder="Search by email" />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => { setSelectedCustomer(null); setShowModal(true); }}>Create Customer</button>
      <Table data={customers} columns={['id', 'first_name', 'last_name', 'email', 'phone']} 
             onEdit={(customer) => { setSelectedCustomer(customer); setShowModal(true); }}
             onDelete={handleDelete} />
      <Pagination currentPage={page} totalItems={total} itemsPerPage={perPage} onPageChange={setPage} />
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <CustomerForm onSubmit={selectedCustomer ? handleUpdate : handleCreate} initialData={selectedCustomer} />
      </Modal>
    </div>
  );
};

export default Customers;