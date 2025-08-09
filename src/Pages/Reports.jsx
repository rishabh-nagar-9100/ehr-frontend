import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Reports.css";

const Reports = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Mock data for previous reports
  const previousReports = [
    {
      id: 1,
      name: "Blood Test - Complete Blood Count",
      date: "2025-08-05",
      type: "Lab Report",
      status: "Normal",
      doctor: "Dr. Smith",
      summary: "All values within normal range"
    },
    {
      id: 2,
      name: "X-Ray - Chest",
      date: "2025-07-28",
      type: "Imaging",
      status: "Attention Required",
      doctor: "Dr. Johnson",
      summary: "Minor inflammation detected in lower right lung"
    },
    {
      id: 3,
      name: "ECG Report",
      date: "2025-07-15",
      type: "Cardiac",
      status: "Normal",
      doctor: "Dr. Wilson",
      summary: "Normal sinus rhythm, no abnormalities"
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setIsAnalyzing(true);
      
      // Simulate analysis process
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisResult({
          fileName: file.name,
          fileSize: (file.size / 1024).toFixed(2) + " KB",
          uploadDate: new Date().toLocaleDateString(),
          status: "Analysis Complete",
          findings: [
            "Document successfully processed",
            "No critical abnormalities detected",
            "Recommend follow-up in 3 months"
          ],
          riskLevel: "Low",
          confidence: "95%"
        });
      }, 3000);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Normal": return "#28a745";
      case "Attention Required": return "#ffc107";
      case "Critical": return "#dc3545";
      default: return "#6c757d";
    }
  };

  const renderUploadTab = () => (
    <div className="upload-section">
      <div className="upload-area">
        <div className="upload-box">
          <div className="upload-icon">📄</div>
          <h3>Upload Medical Report</h3>
          <p>Drag and drop your report here or click to browse</p>
          <input
            type="file"
            id="file-upload"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="file-upload" className="upload-btn">
            Choose File
          </label>
          <p className="upload-note">
            Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
          </p>
        </div>
      </div>

      {isAnalyzing && (
        <div className="analysis-progress">
          <div className="loading-spinner"></div>
          <h4>Analyzing Report...</h4>
          <p>AI is processing your medical report for insights</p>
        </div>
      )}

      {analysisResult && (
        <div className="analysis-result">
          <h4>📊 Analysis Results</h4>
          <div className="result-grid">
            <div className="result-item">
              <strong>File:</strong> {analysisResult.fileName}
            </div>
            <div className="result-item">
              <strong>Size:</strong> {analysisResult.fileSize}
            </div>
            <div className="result-item">
              <strong>Upload Date:</strong> {analysisResult.uploadDate}
            </div>
            <div className="result-item">
              <strong>Risk Level:</strong> 
              <span className={`risk-level ${analysisResult.riskLevel.toLowerCase()}`}>
                {analysisResult.riskLevel}
              </span>
            </div>
          </div>
          
          <div className="findings-section">
            <h5>🔍 Key Findings:</h5>
            <ul>
              {analysisResult.findings.map((finding, index) => (
                <li key={index}>{finding}</li>
              ))}
            </ul>
          </div>
          
          <div className="confidence-score">
            <strong>AI Confidence: {analysisResult.confidence}</strong>
          </div>
        </div>
      )}
    </div>
  );

  const renderPreviousReportsTab = () => (
    <div className="previous-reports">
      <div className="reports-header">
        <h3>📋 Previous Reports</h3>
        <div className="reports-filters">
          <select className="filter-select">
            <option>All Types</option>
            <option>Lab Report</option>
            <option>Imaging</option>
            <option>Cardiac</option>
          </select>
          <select className="filter-select">
            <option>All Status</option>
            <option>Normal</option>
            <option>Attention Required</option>
            <option>Critical</option>
          </select>
        </div>
      </div>

      <div className="reports-list">
        {previousReports.map((report) => (
          <div key={report.id} className="report-card">
            <div className="report-header">
              <h4>{report.name}</h4>
              <span 
                className="status-badge" 
                style={{ backgroundColor: getStatusColor(report.status) }}
              >
                {report.status}
              </span>
            </div>
            
            <div className="report-details">
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span>{report.date}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Type:</span>
                <span>{report.type}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Doctor:</span>
                <span>{report.doctor}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Summary:</span>
                <span>{report.summary}</span>
              </div>
            </div>
            
            <div className="report-actions">
              <button className="action-btn view-btn">👁️ View</button>
              <button className="action-btn download-btn">⬇️ Download</button>
              <button className="action-btn share-btn">📤 Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSummaryTab = () => (
    <div className="summary-section">
      <h3>📊 Health Summary</h3>
      
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-icon">📈</div>
          <div className="summary-content">
            <h4>Health Trend</h4>
            <p className="summary-value improving">Improving</p>
            <p className="summary-desc">Based on last 6 months</p>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon">⚠️</div>
          <div className="summary-content">
            <h4>Risk Factors</h4>
            <p className="summary-value moderate">2 Moderate</p>
            <p className="summary-desc">Require monitoring</p>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon">💊</div>
          <div className="summary-content">
            <h4>Medications</h4>
            <p className="summary-value">3 Active</p>
            <p className="summary-desc">All adherence good</p>
          </div>
        </div>
      </div>
      
      <div className="health-timeline">
        <h4>🕒 Recent Health Timeline</h4>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-date">Aug 5, 2025</div>
            <div className="timeline-content">
              <strong>Blood Test Results</strong>
              <p>All parameters normal, slight improvement in cholesterol</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">Jul 28, 2025</div>
            <div className="timeline-content">
              <strong>Chest X-Ray</strong>
              <p>Minor inflammation detected, prescribed antibiotics</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">Jul 15, 2025</div>
            <div className="timeline-content">
              <strong>ECG Report</strong>
              <p>Normal heart rhythm, no concerns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProblemsTab = () => (
    <div className="problems-section">
      <h3>🚨 Problem Detection & Alerts</h3>
      
      <div className="problems-overview">
        <div className="problem-card critical">
          <div className="problem-icon">🔴</div>
          <div className="problem-content">
            <h4>Critical Issues</h4>
            <p className="problem-count">0</p>
            <p>Require immediate attention</p>
          </div>
        </div>
        
        <div className="problem-card warning">
          <div className="problem-icon">🟡</div>
          <div className="problem-content">
            <h4>Warnings</h4>
            <p className="problem-count">2</p>
            <p>Need monitoring</p>
          </div>
        </div>
        
        <div className="problem-card info">
          <div className="problem-icon">🔵</div>
          <div className="problem-content">
            <h4>Information</h4>
            <p className="problem-count">1</p>
            <p>General recommendations</p>
          </div>
        </div>
      </div>
      
      <div className="detected-problems">
        <h4>⚠️ Detected Issues</h4>
        
        <div className="problem-item warning">
          <div className="problem-header">
            <span className="problem-type">Warning</span>
            <span className="problem-date">Aug 5, 2025</span>
          </div>
          <h5>Elevated Blood Pressure Trend</h5>
          <p>Blood pressure readings show gradual increase over last 3 months. Consider lifestyle modifications and follow-up with cardiologist.</p>
          <div className="problem-actions">
            <button className="action-btn">📞 Contact Doctor</button>
            <button className="action-btn">📅 Schedule Appointment</button>
          </div>
        </div>
        
        <div className="problem-item warning">
          <div className="problem-header">
            <span className="problem-type">Warning</span>
            <span className="problem-date">Jul 28, 2025</span>
          </div>
          <h5>Lung Inflammation</h5>
          <p>Chest X-ray shows minor inflammation in lower right lung. Follow-up imaging recommended in 4 weeks.</p>
          <div className="problem-actions">
            <button className="action-btn">📋 View Report</button>
            <button className="action-btn">⏰ Set Reminder</button>
          </div>
        </div>
        
        <div className="problem-item info">
          <div className="problem-header">
            <span className="problem-type">Info</span>
            <span className="problem-date">Jul 15, 2025</span>
          </div>
          <h5>Vitamin D Deficiency</h5>
          <p>Blood test indicates low vitamin D levels. Consider supplementation and increased sun exposure.</p>
          <div className="problem-actions">
            <button className="action-btn">💊 View Supplements</button>
            <button className="action-btn">📖 Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h1>📋 Medical Reports</h1>
        <p>Upload, view, and analyze your medical reports with AI-powered insights</p>
      </div>

      <div className="reports-tabs">
        <button 
          className={`tab-btn ${activeTab === "upload" ? "active" : ""}`}
          onClick={() => setActiveTab("upload")}
        >
          📤 Upload Report
        </button>
        <button 
          className={`tab-btn ${activeTab === "previous" ? "active" : ""}`}
          onClick={() => setActiveTab("previous")}
        >
          📋 Previous Reports
        </button>
        <button 
          className={`tab-btn ${activeTab === "summary" ? "active" : ""}`}
          onClick={() => setActiveTab("summary")}
        >
          📊 Health Summary
        </button>
        <button 
          className={`tab-btn ${activeTab === "problems" ? "active" : ""}`}
          onClick={() => setActiveTab("problems")}
        >
          🚨 Problem Detection
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "upload" && renderUploadTab()}
        {activeTab === "previous" && renderPreviousReportsTab()}
        {activeTab === "summary" && renderSummaryTab()}
        {activeTab === "problems" && renderProblemsTab()}
      </div>
    </div>
  );
};

export default Reports;
