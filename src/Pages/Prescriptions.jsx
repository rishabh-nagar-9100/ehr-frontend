import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Prescriptions.css";

const Prescriptions = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("current");
  const [showAddModal, setShowAddModal] = useState(false);
  const [prescriptionForm, setPrescriptionForm] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    doctor: "",
    reason: ""
  });

  // Mock data for prescriptions
  const currentPrescriptions = [
    {
      id: 1,
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "Ongoing",
      prescribedBy: "Dr. Sarah Johnson",
      dateStarted: "2025-07-15",
      reason: "High Blood Pressure",
      instructions: "Take with food in the morning",
      status: "Active",
      refillsLeft: 2,
      nextRefill: "2025-08-25"
    },
    {
      id: 2,
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      duration: "Ongoing",
      prescribedBy: "Dr. Michael Smith",
      dateStarted: "2025-06-20",
      reason: "Type 2 Diabetes",
      instructions: "Take with meals",
      status: "Active",
      refillsLeft: 1,
      nextRefill: "2025-08-18"
    },
    {
      id: 3,
      medication: "Ibuprofen",
      dosage: "400mg",
      frequency: "As needed",
      duration: "7 days",
      prescribedBy: "Dr. Emily Wilson",
      dateStarted: "2025-08-01",
      reason: "Joint Pain",
      instructions: "Take with food, maximum 3 times daily",
      status: "Active",
      refillsLeft: 0,
      nextRefill: "Complete"
    }
  ];

  const pastPrescriptions = [
    {
      id: 4,
      medication: "Amoxicillin",
      dosage: "500mg",
      frequency: "Three times daily",
      duration: "10 days",
      prescribedBy: "Dr. Robert Brown",
      dateStarted: "2025-07-01",
      dateEnded: "2025-07-11",
      reason: "Bacterial Infection",
      instructions: "Complete full course",
      status: "Completed"
    },
    {
      id: 5,
      medication: "Prednisone",
      dosage: "20mg",
      frequency: "Once daily",
      duration: "5 days",
      prescribedBy: "Dr. Lisa Davis",
      dateStarted: "2025-06-15",
      dateEnded: "2025-06-20",
      reason: "Allergic Reaction",
      instructions: "Take with food",
      status: "Completed"
    }
  ];

  const medicationReminders = [
    {
      id: 1,
      medication: "Lisinopril",
      time: "8:00 AM",
      taken: true
    },
    {
      id: 2,
      medication: "Metformin",
      time: "8:00 AM",
      taken: true
    },
    {
      id: 3,
      medication: "Metformin",
      time: "6:00 PM",
      taken: false
    }
  ];

  const handleAddPrescription = (e) => {
    e.preventDefault();
    // Handle adding new prescription logic here
    console.log("Adding prescription:", prescriptionForm);
    setShowAddModal(false);
    // Reset form
    setPrescriptionForm({
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
      doctor: "",
      reason: ""
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "#28a745";
      case "Completed": return "#17a2b8";
      case "Discontinued": return "#dc3545";
      case "Paused": return "#ffc107";
      default: return "#6c757d";
    }
  };

  const renderCurrentTab = () => (
    <div className="prescriptions-section">
      {currentPrescriptions.length > 0 ? (
        <div className="prescriptions-list">
          {currentPrescriptions.map((prescription) => (
            <div key={prescription.id} className="prescription-card">
              <div className="prescription-header">
                <div className="medication-info">
                  <h3>💊 {prescription.medication}</h3>
                  <span className="dosage">{prescription.dosage}</span>
                </div>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(prescription.status) }}
                >
                  {prescription.status}
                </span>
              </div>
              
              <div className="prescription-details">
                <div className="detail-row">
                  <span className="label">📋 Frequency:</span>
                  <span className="value">{prescription.frequency}</span>
                </div>
                <div className="detail-row">
                  <span className="label">⏱️ Duration:</span>
                  <span className="value">{prescription.duration}</span>
                </div>
                <div className="detail-row">
                  <span className="label">👨‍⚕️ Prescribed by:</span>
                  <span className="value">{prescription.prescribedBy}</span>
                </div>
                <div className="detail-row">
                  <span className="label">📅 Date Started:</span>
                  <span className="value">{prescription.dateStarted}</span>
                </div>
                <div className="detail-row">
                  <span className="label">🏥 Reason:</span>
                  <span className="value">{prescription.reason}</span>
                </div>
                <div className="instructions">
                  <span className="label">📝 Instructions:</span>
                  <p className="instructions-text">{prescription.instructions}</p>
                </div>
                
                {prescription.refillsLeft > 0 && (
                  <div className="refill-info">
                    <div className="refill-row">
                      <span className="label">🔄 Refills Left:</span>
                      <span className="value refills">{prescription.refillsLeft}</span>
                    </div>
                    <div className="refill-row">
                      <span className="label">📅 Next Refill:</span>
                      <span className="value">{prescription.nextRefill}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="prescription-actions">
                <button className="action-btn refill-btn">🔄 Request Refill</button>
                <button className="action-btn edit-btn">✏️ Edit</button>
                <button className="action-btn stop-btn">⏸️ Stop</button>
                <button className="action-btn info-btn">ℹ️ Info</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-prescriptions">
          <div className="no-prescriptions-icon">💊</div>
          <h3>No Current Prescriptions</h3>
          <p>You don't have any active prescriptions.</p>
        </div>
      )}
    </div>
  );

  const renderPastTab = () => (
    <div className="prescriptions-section">
      <div className="prescriptions-list">
        {pastPrescriptions.map((prescription) => (
          <div key={prescription.id} className="prescription-card past">
            <div className="prescription-header">
              <div className="medication-info">
                <h3>💊 {prescription.medication}</h3>
                <span className="dosage">{prescription.dosage}</span>
              </div>
              <span 
                className="status-badge" 
                style={{ backgroundColor: getStatusColor(prescription.status) }}
              >
                {prescription.status}
              </span>
            </div>
            
            <div className="prescription-details">
              <div className="detail-row">
                <span className="label">📋 Frequency:</span>
                <span className="value">{prescription.frequency}</span>
              </div>
              <div className="detail-row">
                <span className="label">⏱️ Duration:</span>
                <span className="value">{prescription.duration}</span>
              </div>
              <div className="detail-row">
                <span className="label">👨‍⚕️ Prescribed by:</span>
                <span className="value">{prescription.prescribedBy}</span>
              </div>
              <div className="detail-row">
                <span className="label">📅 Started:</span>
                <span className="value">{prescription.dateStarted}</span>
              </div>
              <div className="detail-row">
                <span className="label">📅 Ended:</span>
                <span className="value">{prescription.dateEnded}</span>
              </div>
              <div className="detail-row">
                <span className="label">🏥 Reason:</span>
                <span className="value">{prescription.reason}</span>
              </div>
              <div className="instructions">
                <span className="label">📝 Instructions:</span>
                <p className="instructions-text">{prescription.instructions}</p>
              </div>
            </div>
            
            <div className="prescription-actions">
              <button className="action-btn view-btn">👁️ View Details</button>
              <button className="action-btn renew-btn">🔄 Renew</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRemindersTab = () => (
    <div className="reminders-section">
      <div className="reminders-header">
        <h3>🔔 Today's Medication Reminders</h3>
        <p>Track your daily medication schedule</p>
      </div>
      
      <div className="reminders-list">
        {medicationReminders.map((reminder) => (
          <div key={reminder.id} className={`reminder-card ${reminder.taken ? "taken" : "pending"}`}>
            <div className="reminder-info">
              <div className="medication-name">💊 {reminder.medication}</div>
              <div className="reminder-time">🕐 {reminder.time}</div>
            </div>
            <div className="reminder-status">
              {reminder.taken ? (
                <span className="taken-badge">✅ Taken</span>
              ) : (
                <button className="take-btn">✅ Mark as Taken</button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="reminder-settings">
        <h4>⚙️ Reminder Settings</h4>
        <div className="setting-item">
          <label className="setting-label">
            <input type="checkbox" defaultChecked />
            Enable push notifications
          </label>
        </div>
        <div className="setting-item">
          <label className="setting-label">
            <input type="checkbox" defaultChecked />
            Email reminders
          </label>
        </div>
        <div className="setting-item">
          <label className="setting-label">
            <input type="checkbox" />
            SMS reminders
          </label>
        </div>
      </div>
    </div>
  );

  const renderAddTab = () => (
    <div className="add-prescription-section">
      <div className="add-form-container">
        <h3>➕ Add New Prescription</h3>
        <p>Enter prescription details below</p>
        
        <form onSubmit={handleAddPrescription} className="prescription-form">
          <div className="form-row">
            <div className="form-group">
              <label>💊 Medication Name</label>
              <input
                type="text"
                value={prescriptionForm.medication}
                onChange={(e) => setPrescriptionForm({...prescriptionForm, medication: e.target.value})}
                placeholder="e.g., Lisinopril, Metformin"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label>📏 Dosage</label>
              <input
                type="text"
                value={prescriptionForm.dosage}
                onChange={(e) => setPrescriptionForm({...prescriptionForm, dosage: e.target.value})}
                placeholder="e.g., 10mg, 500mg"
                className="form-input"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>📋 Frequency</label>
              <select
                value={prescriptionForm.frequency}
                onChange={(e) => setPrescriptionForm({...prescriptionForm, frequency: e.target.value})}
                className="form-input"
                required
              >
                <option value="">Select Frequency</option>
                <option value="Once daily">Once daily</option>
                <option value="Twice daily">Twice daily</option>
                <option value="Three times daily">Three times daily</option>
                <option value="Four times daily">Four times daily</option>
                <option value="As needed">As needed</option>
                <option value="Every other day">Every other day</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>⏱️ Duration</label>
              <input
                type="text"
                value={prescriptionForm.duration}
                onChange={(e) => setPrescriptionForm({...prescriptionForm, duration: e.target.value})}
                placeholder="e.g., 7 days, 1 month, Ongoing"
                className="form-input"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>👨‍⚕️ Prescribing Doctor</label>
            <input
              type="text"
              value={prescriptionForm.doctor}
              onChange={(e) => setPrescriptionForm({...prescriptionForm, doctor: e.target.value})}
              placeholder="e.g., Dr. Smith"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label>🏥 Reason for Prescription</label>
            <input
              type="text"
              value={prescriptionForm.reason}
              onChange={(e) => setPrescriptionForm({...prescriptionForm, reason: e.target.value})}
              placeholder="e.g., High blood pressure, Infection"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label>📝 Special Instructions</label>
            <textarea
              value={prescriptionForm.instructions}
              onChange={(e) => setPrescriptionForm({...prescriptionForm, instructions: e.target.value})}
              placeholder="e.g., Take with food, Avoid alcohol"
              className="form-textarea"
              rows="3"
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              💊 Add Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="prescriptions-page">
      <div className="prescriptions-header">
        <div className="header-content">
          <h1>💊 Prescriptions</h1>
          <p>Manage your medications and prescription history</p>
        </div>
        
        <div className="prescription-summary">
          <div className="summary-card">
            <div className="summary-number">{currentPrescriptions.length}</div>
            <div className="summary-label">Active Prescriptions</div>
          </div>
          <div className="summary-card">
            <div className="summary-number">
              {currentPrescriptions.filter(p => p.refillsLeft > 0).length}
            </div>
            <div className="summary-label">Refills Available</div>
          </div>
          <div className="summary-card">
            <div className="summary-number">
              {medicationReminders.filter(r => !r.taken).length}
            </div>
            <div className="summary-label">Pending Today</div>
          </div>
        </div>
      </div>

      <div className="prescriptions-tabs">
        <button 
          className={`tab-btn ${activeTab === "current" ? "active" : ""}`}
          onClick={() => setActiveTab("current")}
        >
          💊 Current ({currentPrescriptions.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === "past" ? "active" : ""}`}
          onClick={() => setActiveTab("past")}
        >
          📋 Past ({pastPrescriptions.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === "reminders" ? "active" : ""}`}
          onClick={() => setActiveTab("reminders")}
        >
          🔔 Reminders ({medicationReminders.filter(r => !r.taken).length})
        </button>
        <button 
          className={`tab-btn ${activeTab === "add" ? "active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          ➕ Add New
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "current" && renderCurrentTab()}
        {activeTab === "past" && renderPastTab()}
        {activeTab === "reminders" && renderRemindersTab()}
        {activeTab === "add" && renderAddTab()}
      </div>
    </div>
  );
};

export default Prescriptions;
