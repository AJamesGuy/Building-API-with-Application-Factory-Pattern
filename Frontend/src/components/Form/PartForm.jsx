// src/components/Form/PartForm.jsx
import React, { useState, useEffect } from 'react';

const PartForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || { desc_id: '', name: '', serial_num: '' });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="desc_id" type="number" value={formData.desc_id} onChange={handleChange} placeholder="Desc ID" required />
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="serial_num" value={formData.serial_num} onChange={handleChange} placeholder="Serial Num" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PartForm;