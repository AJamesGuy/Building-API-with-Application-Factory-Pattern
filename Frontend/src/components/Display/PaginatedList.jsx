// src/components/Display/PaginatedList.jsx
import React from 'react';
import Pagination from '../Utility/Pagination';

const PaginatedList = ({ items, renderItem, currentPage, totalItems, itemsPerPage, onPageChange }) => {
  return (
    <div>
      {items.map(renderItem)}
      <Pagination currentPage={currentPage} totalItems={totalItems} itemsPerPage={itemsPerPage} onPageChange={onPageChange} />
    </div>
  );
};

export default PaginatedList;