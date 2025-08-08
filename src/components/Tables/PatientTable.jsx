// src/components/PatientTable.jsx
import React from "react";
import "./PatientTable.css";

const PatientTable = ({ data, columns }) => {
  return (
    <table className="patient-table">
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col, i) => (
              <td key={i}>{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PatientTable;
