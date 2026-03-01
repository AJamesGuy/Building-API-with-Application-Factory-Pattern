// src/components/Display/MechanicTicketCard.jsx
import React from 'react';

const MechanicTicketCard = ({ ticket }) => {
  return (
    <div className="card">
      <h3>Ticket ID: {ticket.id}</h3>
      <p>Desc: {ticket.service_desc}</p>
      <p>Cost: ${ticket.total_cost}</p>
      <p>Customer ID: {ticket.customer_id}</p>
    </div>
  );
};

export default MechanicTicketCard;