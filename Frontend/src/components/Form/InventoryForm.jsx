// src/components/Form/InventoryForm.jsx
import React, { useState } from 'react';

const InventoryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ description: '', name: '', price: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <button type="submit">Add Description</button>
    </form>
  );
};

export default InventoryForm;