// src/components/Form/MechanicForm.jsx
import React, { useState, useEffect } from 'react';

const MechanicForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || { first_name: '', last_name: '', email: '', password: '', address: '', schedule: '', salary: '' });

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
      <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
      <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
      <input name="schedule" value={formData.schedule} onChange={handleChange} placeholder="Schedule" required />
      <input name="salary" type="number" value={formData.salary} onChange={handleChange} placeholder="Salary" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MechanicForm;