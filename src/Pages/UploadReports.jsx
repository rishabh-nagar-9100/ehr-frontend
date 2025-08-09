// src/Pages/UploadReports.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./UploadReports.css";

const UploadReports = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [reportType, setReportType] = useState("");
  const [reportNotes, setReportNotes] = useState("");

  // Mock patients data
  const patients = [
    { id: 1, name: "Alice Johnson", mrn: "MRN001", dob: "1985-03-15" },
    { id: 2, name: "Michael Brown", mrn: "MRN002", dob: "1978-07-22" },
    { id: 3, name: "Emily Davis", mrn: "MRN003", dob: "1992-11-08" },
    { id: 4, name: "Robert Wilson", mrn: "MRN004", dob: "1965-12-03" },
    { id: 5, name: "Sarah Martinez", mrn: "MRN005", dob: "1988-09-14" }
  ];

  // Mock uploaded reports
  const [uploadedReports, setUploadedReports] = useState([
    {
      id: 1,
      patientName: "Alice Johnson",
      patientMRN: "MRN001",
      reportType: "Lab Results",
      fileName: "blood_test_results.pdf",
      uploadDate: "2025-08-09",
      uploadedBy: user?.name || "Staff Member",
      status: "Processed",
      fileSize: "2.4 MB"
    },
    {
      id: 2,
      patientName: "Michael Brown",
      patientMRN: "MRN002",
      reportType: "X-Ray",
      fileName: "chest_xray.jpg",
      uploadDate: "2025-08-08",
      uploadedBy: user?.name || "Staff Member",
      status: "Pending Review",
      fileSize: "5.1 MB"
    },
    {
      id: 3,
      patientName: "Emily Davis",
      patientMRN: "MRN003",
      reportType: "MRI Scan",
      fileName: "brain_mri_report.pdf",
      uploadDate: "2025-08-07",
      uploadedBy: user?.name || "Staff Member",
      status: "Reviewed",
      fileSize: "12.8 MB"
    }
  ]);

  const reportTypes = [
    "Lab Results",
    "X-Ray",
    "MRI Scan",
    "CT Scan",
    "Ultrasound",
    "ECG/EKG",
    "Blood Test",
    "Urine Test",
    "Pathology Report",
    "Discharge Summary",
    "Consultation Notes",
    "Other"
  ];

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const simulateUpload = (file, index) => {
    setUploadProgress(prev => ({ ...prev, [index]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[index] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [index]: currentProgress + 10 };
      });
    }, 200);
  };

  const handleUpload = () => {
    if (!selectedPatient || !reportType || selectedFiles.length === 0) {
      alert("Please select a patient, report type, and files to upload");
      return;
    }

    selectedFiles.forEach((file, index) => {
      simulateUpload(file, index);
    });

    // Add to uploaded reports after a delay
    setTimeout(() => {
      const newReports = selectedFiles.map((file, index) => ({
        id: uploadedReports.length + index + 1,
        patientName: selectedPatient.name,
        patientMRN: selectedPatient.mrn,
        reportType: reportType,
        fileName: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedBy: user?.name || "Staff Member",
        status: "Processing",
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        notes: reportNotes
      }));
      
      setUploadedReports(prev => [...newReports, ...prev]);
      setSelectedFiles([]);
      setUploadProgress({});
      setSelectedPatient(null);
      setReportType("");
      setReportNotes("");
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processed": return "#28a745";
      case "Reviewed": return "#17a2b8";
      case "Pending Review": return "#ffc107";
      case "Processing": return "#6f42c1";
      default: return "#6c757d";
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    patient.mrn.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const renderUploadSection = () => (
    <div className="upload-section">
      <div className="upload-form">
        <div className="form-header">
          <h3>📤 Upload Medical Reports</h3>
          <p>Upload lab results, imaging reports, and other medical documents</p>
        </div>

        <div className="patient-selection">
          <label>👤 Select Patient</label>
          <div className="patient-search">
            <input
              type="text"
              placeholder="Search patient by name or MRN..."
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
              className="search-input"
            />
            {patientSearch && (
              <div className="patient-dropdown">
                {filteredPatients.map(patient => (
                  <div
                    key={patient.id}
                    className="patient-option"
                    onClick={() => {
                      setSelectedPatient(patient);
                      setPatientSearch("");
                    }}
                  >
                    <strong>{patient.name}</strong>
                    <span>MRN: {patient.mrn} • DOB: {patient.dob}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedPatient && (
            <div className="selected-patient">
              <span>Selected: <strong>{selectedPatient.name}</strong> (MRN: {selectedPatient.mrn})</span>
              <button onClick={() => setSelectedPatient(null)}>✕</button>
            </div>
          )}
        </div>

        <div className="report-details">
          <div className="form-row">
            <div className="form-group">
              <label>📋 Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="form-select"
              >
                <option value="">Select report type</option>
                {reportTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>📝 Notes (Optional)</label>
            <textarea
              value={reportNotes}
              onChange={(e) => setReportNotes(e.target.value)}
              placeholder="Add any additional notes about this report..."
              className="form-textarea"
              rows="3"
            />
          </div>
        </div>

        <div className="file-upload">
          <label>📎 Select Files</label>
          <div className="upload-zone">
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileSelect}
              className="file-input"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="upload-label">
              <div className="upload-icon">📁</div>
              <div className="upload-text">
                <strong>Click to select files</strong> or drag and drop
                <br />
                <small>PDF, JPG, PNG, DOC, DOCX up to 50MB each</small>
              </div>
            </label>
          </div>

          {selectedFiles.length > 0 && (
            <div className="selected-files">
              <h4>Selected Files ({selectedFiles.length})</h4>
              {selectedFiles.map((file, index) => (
                <div key={index} className="file-item">
                  <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                  </div>
                  {uploadProgress[index] !== undefined ? (
                    <div className="upload-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${uploadProgress[index]}%` }}
                        ></div>
                      </div>
                      <span>{uploadProgress[index]}%</span>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleRemoveFile(index)}
                      className="remove-file"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="upload-actions">
          <button 
            onClick={handleUpload}
            className="upload-btn"
            disabled={!selectedPatient || !reportType || selectedFiles.length === 0}
          >
            📤 Upload Reports
          </button>
        </div>
      </div>
    </div>
  );

  const renderReportsHistory = () => (
    <div className="reports-history">
      <div className="history-header">
        <h3>📋 Upload History</h3>
        <p>Recently uploaded reports and their status</p>
      </div>

      <div className="reports-stats">
        <div className="stat-card">
          <div className="stat-number">{uploadedReports.length}</div>
          <div className="stat-label">Total Uploads</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{uploadedReports.filter(r => r.status === "Processed").length}</div>
          <div className="stat-label">Processed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{uploadedReports.filter(r => r.status === "Pending Review").length}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{uploadedReports.filter(r => r.uploadDate === new Date().toISOString().split('T')[0]).length}</div>
          <div className="stat-label">Today</div>
        </div>
      </div>

      <div className="reports-list">
        {uploadedReports.map(report => (
          <div key={report.id} className="report-item">
            <div className="report-header">
              <div className="report-info">
                <h4>{report.fileName}</h4>
                <p>
                  <strong>{report.patientName}</strong> (MRN: {report.patientMRN})
                </p>
              </div>
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(report.status) }}
              >
                {report.status}
              </span>
            </div>
            
            <div className="report-details">
              <div className="detail-row">
                <span>📋 Type:</span>
                <span>{report.reportType}</span>
              </div>
              <div className="detail-row">
                <span>📅 Upload Date:</span>
                <span>{report.uploadDate}</span>
              </div>
              <div className="detail-row">
                <span>👤 Uploaded by:</span>
                <span>{report.uploadedBy}</span>
              </div>
              <div className="detail-row">
                <span>📏 File Size:</span>
                <span>{report.fileSize}</span>
              </div>
              {report.notes && (
                <div className="detail-row">
                  <span>📝 Notes:</span>
                  <span>{report.notes}</span>
                </div>
              )}
            </div>

            <div className="report-actions">
              <button className="action-btn view-btn">👁️ View</button>
              <button className="action-btn download-btn">📥 Download</button>
              <button className="action-btn share-btn">📤 Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInstructions = () => (
    <div className="instructions-section">
      <h3>📖 Upload Guidelines</h3>
      <div className="guidelines">
        <div className="guideline-card">
          <h4>📋 Supported File Types</h4>
          <ul>
            <li>PDF documents (.pdf)</li>
            <li>Images (.jpg, .jpeg, .png)</li>
            <li>Word documents (.doc, .docx)</li>
          </ul>
        </div>
        
        <div className="guideline-card">
          <h4>📏 File Requirements</h4>
          <ul>
            <li>Maximum file size: 50MB per file</li>
            <li>Multiple files can be uploaded at once</li>
            <li>Clear, legible scans or photos</li>
          </ul>
        </div>
        
        <div className="guideline-card">
          <h4>👤 Patient Information</h4>
          <ul>
            <li>Verify patient identity before upload</li>
            <li>Ensure MRN matches the report</li>
            <li>Select appropriate report type</li>
          </ul>
        </div>
        
        <div className="guideline-card">
          <h4>🔒 Privacy & Security</h4>
          <ul>
            <li>All uploads are encrypted</li>
            <li>Access logged for audit purposes</li>
            <li>HIPAA compliant storage</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="upload-reports-page">
      <div className="page-header">
        <h1>📤 Upload Reports</h1>
        <p>Upload medical reports and documents for patient records</p>
      </div>

      <div className="upload-tabs">
        <button 
          className={`tab ${activeTab === "upload" ? "active" : ""}`}
          onClick={() => setActiveTab("upload")}
        >
          📤 Upload
        </button>
        <button 
          className={`tab ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          📋 History
        </button>
        <button 
          className={`tab ${activeTab === "guidelines" ? "active" : ""}`}
          onClick={() => setActiveTab("guidelines")}
        >
          📖 Guidelines
        </button>
      </div>

      <div className="upload-content">
        {activeTab === "upload" && renderUploadSection()}
        {activeTab === "history" && renderReportsHistory()}
        {activeTab === "guidelines" && renderInstructions()}
      </div>
    </div>
  );
};

export default UploadReports;
