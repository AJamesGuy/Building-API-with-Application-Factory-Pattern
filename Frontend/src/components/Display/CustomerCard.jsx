// src/components/Display/CustomerCard.jsx
import React from 'react';

const CustomerCard = ({ customer }) => {
  return (
    <div className="card">
      <h3>{customer.first_name} {customer.last_name}</h3>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
    </div>
  );
};

export default CustomerCard;