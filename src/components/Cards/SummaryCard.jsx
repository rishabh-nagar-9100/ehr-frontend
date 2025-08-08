// src/components/SummaryCard.jsx
import React from "react";
import "./SummaryCard.css";

const SummaryCard = ({ title, value, icon }) => {
  return (
    <div className="summary-card">
      <div className="card-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
