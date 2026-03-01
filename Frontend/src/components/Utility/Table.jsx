// src/components/Utility/Table.jsx
import React from 'react';

const Table = ({
  columns,
  data,
  onRowClick,
  className = '',
  emptyMessage = 'No data available'
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-400 mb-2">{emptyMessage}</h3>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto rounded-xl shadow-lg ${className}`}>
      <table className="w-full">
        {/* Table Header */}
        <thead>
          <tr style={{ backgroundColor: '#092327' }}>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider"
                style={{ borderBottom: '2px solid #6A7062' }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-700">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              className={`transition-all duration-200 ${
                onRowClick ? 'cursor-pointer hover:bg-gray-700' : ''
              }`}
              style={{ backgroundColor: '#092327' }}
              onMouseEnter={(e) => {
                if (onRowClick) {
                  e.target.closest('tr').style.backgroundColor = '#6A7062';
                }
              }}
              onMouseLeave={(e) => {
                if (onRowClick) {
                  e.target.closest('tr').style.backgroundColor = '#092327';
                }
              }}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 text-sm text-gray-300"
                  style={{ borderBottom: '1px solid #6A7062' }}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;