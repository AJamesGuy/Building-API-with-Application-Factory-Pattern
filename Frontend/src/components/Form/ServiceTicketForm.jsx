// src/components/Form/ServiceTicketForm.jsx
import React, { useState } from 'react';

const ServiceTicketForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ customer_id: '', service_desc: '', total_cost: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="customer_id" type="number" value={formData.customer_id} onChange={handleChange} placeholder="Customer ID" required />
      <input name="service_desc" value={formData.service_desc} onChange={handleChange} placeholder="Service Desc" required />
      <input name="total_cost" type="number" value={formData.total_cost} onChange={handleChange} placeholder="Total Cost" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ServiceTicketForm;