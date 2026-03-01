// src/components/Form/CustomerForm.jsx
import React, { useState, useEffect } from 'react';

const CustomerForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || { first_name: '', last_name: '', email: '', password: '', phone: '', address: '' });

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
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomerForm;