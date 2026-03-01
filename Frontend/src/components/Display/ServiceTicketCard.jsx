// src/components/Display/ServiceTicketCard.jsx
import React from 'react';

const ServiceTicketCard = ({ ticket }) => {
  return (
    <div className="card">
      <h3>Ticket ID: {ticket.id}</h3>
      <p>Customer ID: {ticket.customer_id}</p>
      <p>Desc: {ticket.service_desc}</p>
      <p>Cost: ${ticket.total_cost}</p>
    </div>
  );
};

export default ServiceTicketCard;