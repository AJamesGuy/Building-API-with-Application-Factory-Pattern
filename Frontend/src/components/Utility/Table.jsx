// src/components/Utility/Table.jsx
import React from 'react';

const Table = ({ data, columns, onEdit, onDelete, onViewTickets, onAddDesc, onAssign, onRemove, onAddPart }) => {
  return (
    <table>
      <thead>
        <tr>{columns.map((col) => <th key={col}>{col}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((col) => <td key={col}>{item[col]}</td>)}
            <td>
              {onEdit && <button onClick={() => onEdit(item)}>Edit</button>}
              {onDelete && <button onClick={() => onDelete(item.id)}>Delete</button>}
              {onViewTickets && <button onClick={() => onViewTickets(item)}>View Tickets</button>}
              {onAddDesc && <button onClick={() => onAddDesc(item)}>Add Desc</button>}
              {onAssign && <button onClick={() => onAssign(item)}>Assign Mechanic</button>}
              {onRemove && <button onClick={() => onRemove(item)}>Remove Mechanic</button>}
              {onAddPart && <button onClick={() => onAddPart(item)}>Add Part</button>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;