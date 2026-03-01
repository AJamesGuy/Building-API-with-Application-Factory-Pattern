// src/components/Display/MechanicRankingCard.jsx
import React from 'react';

const MechanicRankingCard = ({ ranking }) => {
  return (
    <div className="card">
      <h3>{ranking.first_name} {ranking.last_name}</h3>
      <p>Email: {ranking.email}</p>
      <p>Tickets: {ranking.tickets_count}</p>
    </div>
  );
};

export default MechanicRankingCard;