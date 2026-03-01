// src/components/Display/MechanicCard.jsx
import React from 'react';

const MechanicCard = ({ mechanic }) => {
  return (
    <div className="card">
      <h3>{mechanic.first_name} {mechanic.last_name}</h3>
      <p>Email: {mechanic.email}</p>
      <p>Address: {mechanic.address}</p>
      <p>Schedule: {mechanic.schedule}</p>
      <p>Salary: ${mechanic.salary}</p>
    </div>
  );
};

export default MechanicCard;