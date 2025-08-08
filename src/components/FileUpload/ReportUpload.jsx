// src/components/ReportUpload.jsx
import React, { useState } from "react";
import "./ReportUpload.css";

const ReportUpload = () => {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (file) {
      alert(`Uploaded: ${file.name}`);
    }
  };

  return (
    <div className="report-upload">
      <h3>Upload Medical Report</h3>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ReportUpload;
