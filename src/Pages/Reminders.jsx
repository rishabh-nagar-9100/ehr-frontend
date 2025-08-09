// src/Pages/Reminders.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Reminders.css";

const Reminders = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    type: "",
    priority: "medium",
    dueDate: "",
    dueTime: "",
    patientName: "",
    patientMRN: "",
    recurring: false,
    recurringInterval: "daily"
  });

  // Mock reminders data
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Follow-up Call - Alice Johnson",
      description: "Call patient regarding lab results and schedule follow-up appointment",
      type: "Patient Follow-up",
      priority: "high",
      dueDate: "2025-08-09",
      dueTime: "10:00",
      patientName: "Alice Johnson",
      patientMRN: "MRN001",
      status: "pending",
      createdBy: "Dr. Smith",
      createdDate: "2025-08-07",
      recurring: false
    },
    {
      id: 2,
      title: "Equipment Maintenance - MRI Machine",
      description: "Monthly maintenance check for MRI machine in radiology department",
      type: "Equipment",
      priority: "medium",
      dueDate: "2025-08-10",
      dueTime: "14:00",
      status: "pending",
      createdBy: "Maintenance Team",
      createdDate: "2025-08-01",
      recurring: true,
      recurringInterval: "monthly"
    },
    {
      id: 3,
      title: "Medication Refill - Michael Brown",
      description: "Patient needs prescription refill for diabetes medication",
      type: "Medication",
      priority: "high",
      dueDate: "2025-08-09",
      dueTime: "09:00",
      patientName: "Michael Brown",
      patientMRN: "MRN002",
      status: "completed",
      createdBy: "Pharmacy",
      createdDate: "2025-08-05",
      completedDate: "2025-08-09",
      recurring: false
    },
    {
      id: 4,
      title: "Lab Results Review",
      description: "Review and process pending lab results from yesterday",
      type: "Lab Work",
      priority: "medium",
      dueDate: "2025-08-09",
      dueTime: "08:30",
      status: "in-progress",
      createdBy: user?.name || "Staff Member",
      createdDate: "2025-08-08",
      recurring: false
    },
    {
      id: 5,
      title: "Insurance Verification - Emily Davis",
      description: "Verify insurance coverage for upcoming surgery",
      type: "Administrative",
      priority: "low",
      dueDate: "2025-08-12",
      dueTime: "11:00",
      patientName: "Emily Davis",
      patientMRN: "MRN003",
      status: "pending",
      createdBy: "Insurance Team",
      createdDate: "2025-08-08",
      recurring: false
    }
  ]);

  const reminderTypes = [
    "Patient Follow-up",
    "Medication",
    "Lab Work",
    "Equipment",
    "Administrative",
    "Appointment",
    "Emergency",
    "Other"
  ];

  const priorityColors = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#10b981"
  };

  const statusColors = {
    pending: "#6b7280",
    "in-progress": "#3b82f6",
    completed: "#10b981",
    overdue: "#ef4444"
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    const reminder = {
      id: reminders.length + 1,
      ...newReminder,
      status: "pending",
      createdBy: user?.name || "Staff Member",
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    setReminders([reminder, ...reminders]);
    setNewReminder({
      title: "",
      description: "",
      type: "",
      priority: "medium",
      dueDate: "",
      dueTime: "",
      patientName: "",
      patientMRN: "",
      recurring: false,
      recurringInterval: "daily"
    });
    setShowAddModal(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { 
            ...reminder, 
            status: newStatus,
            ...(newStatus === "completed" && { completedDate: new Date().toISOString().split('T')[0] })
          }
        : reminder
    ));
  };

  const getFilteredReminders = () => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (activeTab) {
      case "all":
        return reminders;
      case "today":
        return reminders.filter(r => r.dueDate === today);
      case "overdue":
        return reminders.filter(r => 
          r.dueDate < today && r.status !== "completed"
        );
      case "completed":
        return reminders.filter(r => r.status === "completed");
      default:
        return reminders;
    }
  };

  const isOverdue = (reminder) => {
    const today = new Date().toISOString().split('T')[0];
    return reminder.dueDate < today && reminder.status !== "completed";
  };

  const renderReminderCard = (reminder) => (
    <div 
      key={reminder.id} 
      className={`reminder-card ${isOverdue(reminder) ? 'overdue' : ''}`}
      onClick={() => setSelectedReminder(reminder)}
    >
      <div className="reminder-header">
        <div className="reminder-title">
          <h4>{reminder.title}</h4>
          <span className="reminder-type">{reminder.type}</span>
        </div>
        <div className="reminder-badges">
          <span 
            className="priority-badge"
            style={{ backgroundColor: priorityColors[reminder.priority] }}
          >
            {reminder.priority.toUpperCase()}
          </span>
          <span 
            className="status-badge"
            style={{ backgroundColor: isOverdue(reminder) ? statusColors.overdue : statusColors[reminder.status] }}
          >
            {isOverdue(reminder) ? "OVERDUE" : reminder.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="reminder-description">
        <p>{reminder.description}</p>
      </div>

      <div className="reminder-details">
        <div className="detail-item">
          <span className="icon">📅</span>
          <span>{reminder.dueDate} at {reminder.dueTime}</span>
        </div>
        {reminder.patientName && (
          <div className="detail-item">
            <span className="icon">👤</span>
            <span>{reminder.patientName} (MRN: {reminder.patientMRN})</span>
          </div>
        )}
        <div className="detail-item">
          <span className="icon">👨‍💼</span>
          <span>Created by {reminder.createdBy}</span>
        </div>
        {reminder.recurring && (
          <div className="detail-item">
            <span className="icon">🔄</span>
            <span>Recurring ({reminder.recurringInterval})</span>
          </div>
        )}
      </div>

      <div className="reminder-actions">
        {reminder.status === "pending" && (
          <>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange(reminder.id, "in-progress");
              }}
              className="action-btn start-btn"
            >
              ▶️ Start
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange(reminder.id, "completed");
              }}
              className="action-btn complete-btn"
            >
              ✅ Complete
            </button>
          </>
        )}
        {reminder.status === "in-progress" && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(reminder.id, "completed");
            }}
            className="action-btn complete-btn"
          >
            ✅ Complete
          </button>
        )}
        {reminder.status === "completed" && reminder.completedDate && (
          <span className="completed-date">
            ✅ Completed on {reminder.completedDate}
          </span>
        )}
      </div>
    </div>
  );

  const renderReminderModal = () => (
    selectedReminder && (
      <div className="modal-overlay" onClick={() => setSelectedReminder(null)}>
        <div className="reminder-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{selectedReminder.title}</h3>
            <button onClick={() => setSelectedReminder(null)} className="close-btn">✕</button>
          </div>
          
          <div className="modal-content">
            <div className="reminder-full-details">
              <div className="detail-section">
                <h4>📋 Reminder Details</h4>
                <div className="detail-grid">
                  <div className="detail-row">
                    <strong>Type:</strong> {selectedReminder.type}
                  </div>
                  <div className="detail-row">
                    <strong>Priority:</strong> 
                    <span 
                      className="priority-inline"
                      style={{ color: priorityColors[selectedReminder.priority] }}
                    >
                      {selectedReminder.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="detail-row">
                    <strong>Due Date:</strong> {selectedReminder.dueDate}
                  </div>
                  <div className="detail-row">
                    <strong>Due Time:</strong> {selectedReminder.dueTime}
                  </div>
                  <div className="detail-row">
                    <strong>Status:</strong>
                    <span 
                      className="status-inline"
                      style={{ color: isOverdue(selectedReminder) ? statusColors.overdue : statusColors[selectedReminder.status] }}
                    >
                      {isOverdue(selectedReminder) ? "OVERDUE" : selectedReminder.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>📝 Description</h4>
                <p>{selectedReminder.description}</p>
              </div>

              {selectedReminder.patientName && (
                <div className="detail-section">
                  <h4>👤 Patient Information</h4>
                  <div className="detail-grid">
                    <div className="detail-row">
                      <strong>Patient Name:</strong> {selectedReminder.patientName}
                    </div>
                    <div className="detail-row">
                      <strong>MRN:</strong> {selectedReminder.patientMRN}
                    </div>
                  </div>
                </div>
              )}

              <div className="detail-section">
                <h4>📊 Tracking Information</h4>
                <div className="detail-grid">
                  <div className="detail-row">
                    <strong>Created by:</strong> {selectedReminder.createdBy}
                  </div>
                  <div className="detail-row">
                    <strong>Created on:</strong> {selectedReminder.createdDate}
                  </div>
                  {selectedReminder.completedDate && (
                    <div className="detail-row">
                      <strong>Completed on:</strong> {selectedReminder.completedDate}
                    </div>
                  )}
                  <div className="detail-row">
                    <strong>Recurring:</strong> {selectedReminder.recurring ? `Yes (${selectedReminder.recurringInterval})` : "No"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            {selectedReminder.status !== "completed" && (
              <button 
                onClick={() => {
                  handleStatusChange(selectedReminder.id, "completed");
                  setSelectedReminder(null);
                }}
                className="modal-btn complete-btn"
              >
                ✅ Mark Complete
              </button>
            )}
            <button 
              onClick={() => setSelectedReminder(null)}
              className="modal-btn close-btn-modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );

  const renderAddReminderModal = () => (
    showAddModal && (
      <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
        <div className="add-reminder-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>➕ Add New Reminder</h3>
            <button onClick={() => setShowAddModal(false)} className="close-btn">✕</button>
          </div>
          
          <form onSubmit={handleAddReminder} className="add-reminder-form">
            <div className="form-group">
              <label>📝 Title</label>
              <input
                type="text"
                value={newReminder.title}
                onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                placeholder="Brief description of the reminder"
                required
              />
            </div>

            <div className="form-group">
              <label>📋 Description</label>
              <textarea
                value={newReminder.description}
                onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                placeholder="Detailed description of what needs to be done"
                rows="3"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>📂 Type</label>
                <select
                  value={newReminder.type}
                  onChange={(e) => setNewReminder({...newReminder, type: e.target.value})}
                  required
                >
                  <option value="">Select type</option>
                  {reminderTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>🚨 Priority</label>
                <select
                  value={newReminder.priority}
                  onChange={(e) => setNewReminder({...newReminder, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>📅 Due Date</label>
                <input
                  type="date"
                  value={newReminder.dueDate}
                  onChange={(e) => setNewReminder({...newReminder, dueDate: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>🕐 Due Time</label>
                <input
                  type="time"
                  value={newReminder.dueTime}
                  onChange={(e) => setNewReminder({...newReminder, dueTime: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>👤 Patient Name (Optional)</label>
                <input
                  type="text"
                  value={newReminder.patientName}
                  onChange={(e) => setNewReminder({...newReminder, patientName: e.target.value})}
                  placeholder="Patient name if applicable"
                />
              </div>
              <div className="form-group">
                <label>🏥 Patient MRN (Optional)</label>
                <input
                  type="text"
                  value={newReminder.patientMRN}
                  onChange={(e) => setNewReminder({...newReminder, patientMRN: e.target.value})}
                  placeholder="Medical record number"
                />
              </div>
            </div>

            <div className="recurring-section">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={newReminder.recurring}
                  onChange={(e) => setNewReminder({...newReminder, recurring: e.target.checked})}
                />
                <label htmlFor="recurring">🔄 Recurring Reminder</label>
              </div>
              
              {newReminder.recurring && (
                <div className="form-group">
                  <label>📅 Recurring Interval</label>
                  <select
                    value={newReminder.recurringInterval}
                    onChange={(e) => setNewReminder({...newReminder, recurringInterval: e.target.value})}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                ➕ Add Reminder
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );

  const todayReminders = reminders.filter(r => r.dueDate === new Date().toISOString().split('T')[0]);
  const overdueReminders = reminders.filter(r => isOverdue(r));
  const completedReminders = reminders.filter(r => r.status === "completed");

  return (
    <div className="reminders-page">
      <div className="page-header">
        <h1>🔔 Reminders</h1>
        <p>Manage tasks, follow-ups, and important notifications</p>
      </div>

      <div className="reminders-stats">
        <div className="stat-card">
          <div className="stat-number">{reminders.length}</div>
          <div className="stat-label">Total Reminders</div>
        </div>
        <div className="stat-card today">
          <div className="stat-number">{todayReminders.length}</div>
          <div className="stat-label">Due Today</div>
        </div>
        <div className="stat-card overdue">
          <div className="stat-number">{overdueReminders.length}</div>
          <div className="stat-label">Overdue</div>
        </div>
        <div className="stat-card completed">
          <div className="stat-number">{completedReminders.length}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      <div className="reminders-controls">
        <div className="reminder-tabs">
          <button 
            className={`tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            📋 All ({reminders.length})
          </button>
          <button 
            className={`tab ${activeTab === "today" ? "active" : ""}`}
            onClick={() => setActiveTab("today")}
          >
            📅 Today ({todayReminders.length})
          </button>
          <button 
            className={`tab ${activeTab === "overdue" ? "active" : ""}`}
            onClick={() => setActiveTab("overdue")}
          >
            ⚠️ Overdue ({overdueReminders.length})
          </button>
          <button 
            className={`tab ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            ✅ Completed ({completedReminders.length})
          </button>
        </div>
        
        <button 
          className="add-reminder-btn"
          onClick={() => setShowAddModal(true)}
        >
          ➕ Add Reminder
        </button>
      </div>

      <div className="reminders-list">
        {getFilteredReminders().length > 0 ? (
          getFilteredReminders().map(reminder => renderReminderCard(reminder))
        ) : (
          <div className="no-reminders">
            <div className="no-reminders-icon">🔔</div>
            <h3>No Reminders Found</h3>
            <p>No reminders match your current filter.</p>
          </div>
        )}
      </div>

      {renderReminderModal()}
      {renderAddReminderModal()}
    </div>
  );
};

export default Reminders;
