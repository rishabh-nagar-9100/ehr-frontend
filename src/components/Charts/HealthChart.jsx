// src/components/HealthChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const HealthChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Health Score",
        data: [75, 80, 78, 85, 90],
        borderColor: "blue",
        fill: false
      }
    ]
  };

  return (
    <div style={{ background: "#fff", padding: "1rem", borderRadius: "8px" }}>
      <h3>Health Trends</h3>
      <Line data={data} />
    </div>
  );
};

export default HealthChart;
