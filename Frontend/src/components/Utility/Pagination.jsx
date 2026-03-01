// src/components/Utility/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: currentPage === 1 ? '#6A7062' : '#0B5351',
          color: 'white'
        }}
        onMouseEnter={(e) => {
          if (currentPage !== 1) {
            e.target.style.backgroundColor = '#6A7062';
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== 1) {
            e.target.style.backgroundColor = '#0B5351';
          }
        }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-400">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === page
                  ? 'shadow-lg transform scale-105'
                  : 'hover:shadow-md'
              }`}
              style={{
                backgroundColor: currentPage === page ? '#0B5351' : '#092327',
                color: 'white',
                border: currentPage === page ? '2px solid #6A7062' : '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== page) {
                  e.target.style.backgroundColor = '#6A7062';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== page) {
                  e.target.style.backgroundColor = '#092327';
                }
              }}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: currentPage === totalPages ? '#6A7062' : '#0B5351',
          color: 'white'
        }}
        onMouseEnter={(e) => {
          if (currentPage !== totalPages) {
            e.target.style.backgroundColor = '#6A7062';
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== totalPages) {
            e.target.style.backgroundColor = '#0B5351';
          }
        }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;