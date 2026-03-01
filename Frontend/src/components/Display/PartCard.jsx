// src/components/Display/PartCard.jsx
import React from 'react';

const PartCard = ({ part }) => {
  return (
    <div className="card">
      <h3>{part.name}</h3>
      <p>Desc ID: {part.desc_id}</p>
      <p>Serial: {part.serial_num}</p>
    </div>
  );
};

export default PartCard;