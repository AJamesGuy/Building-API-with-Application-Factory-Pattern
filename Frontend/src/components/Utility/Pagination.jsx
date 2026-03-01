// src/components/Utility/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} onClick={() => onPageChange(i + 1)} disabled={currentPage === i + 1}>
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;