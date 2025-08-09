// src/Pages/Staff.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Staff.css";

const Staff = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Mock staff data
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@hospital.com",
      phone: "(555) 123-4567",
      role: "Nurse",
      department: "Emergency",
      shift: "Day Shift (7 AM - 7 PM)",
      status: "Active",
      joinDate: "2022-01-15",
      experience: "5 years",
      certifications: ["RN", "BLS", "ACLS"],
      performance: 92,
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@hospital.com",
      phone: "(555) 234-5678",
      role: "Lab Technician",
      department: "Laboratory",
      shift: "Night Shift (7 PM - 7 AM)",
      status: "Active",
      joinDate: "2021-08-10",
      experience: "3 years",
      certifications: ["MLT", "Phlebotomy"],
      performance: 88,
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@hospital.com",
      phone: "(555) 345-6789",
      role: "Pharmacist",
      department: "Pharmacy",
      shift: "Day Shift (8 AM - 6 PM)",
      status: "On Leave",
      joinDate: "2020-03-22",
      experience: "7 years",
      certifications: ["PharmD", "BCPS"],
      performance: 95,
      avatar: "https://images.unsplash.com/photo-1594824388853-d0c0d2d1f1e2?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@hospital.com",
      phone: "(555) 456-7890",
      role: "Administrative Assistant",
      department: "Administration",
      shift: "Day Shift (9 AM - 5 PM)",
      status: "Active",
      joinDate: "2023-02-01",
      experience: "2 years",
      certifications: ["Medical Administration"],
      performance: 85,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ]);

  const [departments] = useState([
    "Emergency", "ICU", "Surgery", "Cardiology", "Neurology", 
    "Laboratory", "Pharmacy", "Radiology", "Administration", "Housekeeping"
  ]);

  const [shifts] = useState([
    "Day Shift (7 AM - 7 PM)",
    "Night Shift (7 PM - 7 AM)",
    "Evening Shift (3 PM - 11 PM)",
    "Rotating Shifts"
  ]);

  // Add staff form state
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    shift: "",
    experience: "",
    certifications: "",
    joinDate: ""
  });

  const handleAddStaff = (e) => {
    e.preventDefault();
    const staff = {
      id: staffMembers.length + 1,
      ...newStaff,
      status: "Active",
      performance: Math.floor(Math.random() * 20) + 80,
      certifications: newStaff.certifications.split(",").map(cert => cert.trim()),
      avatar: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1559839734-2b71ea197ec2' : '1507003211169-0a1dd7228f2d'}?w=100&h=100&fit=crop&crop=face`
    };
    setStaffMembers([...staffMembers, staff]);
    setNewStaff({
      name: "", email: "", phone: "", role: "", department: "", 
      shift: "", experience: "", certifications: "", joinDate: ""
    });
    setShowAddStaff(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "#10b981";
      case "On Leave": return "#f59e0b";
      case "Inactive": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const renderOverview = () => (
    <div className="staff-overview">
      <div className="staff-stats">
        <div className="stat-card">
          <h3>Total Staff</h3>
          <p className="stat-number">{staffMembers.length}</p>
          <span className="stat-change positive">+2 this month</span>
        </div>
        <div className="stat-card">
          <h3>Active Staff</h3>
          <p className="stat-number">{staffMembers.filter(s => s.status === "Active").length}</p>
          <span className="stat-change positive">95% availability</span>
        </div>
        <div className="stat-card">
          <h3>Avg Performance</h3>
          <p className="stat-number">{Math.round(staffMembers.reduce((acc, s) => acc + s.performance, 0) / staffMembers.length)}%</p>
          <span className="stat-change positive">+3% this quarter</span>
        </div>
        <div className="stat-card">
          <h3>Open Positions</h3>
          <p className="stat-number">3</p>
          <span className="stat-change neutral">2 in review</span>
        </div>
      </div>

      <div className="staff-charts">
        <div className="chart-container">
          <h3>Staff by Department</h3>
          <div className="department-chart">
            {departments.map(dept => {
              const count = staffMembers.filter(s => s.department === dept).length;
              return count > 0 ? (
                <div key={dept} className="dept-bar">
                  <span className="dept-label">{dept}</span>
                  <div className="dept-progress">
                    <div 
                      className="dept-fill" 
                      style={{ width: `${(count / staffMembers.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="dept-count">{count}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>

        <div className="chart-container">
          <h3>Performance Distribution</h3>
          <div className="performance-chart">
            <div className="perf-segment excellent">
              <span>Excellent (90-100%)</span>
              <span>{staffMembers.filter(s => s.performance >= 90).length}</span>
            </div>
            <div className="perf-segment good">
              <span>Good (80-89%)</span>
              <span>{staffMembers.filter(s => s.performance >= 80 && s.performance < 90).length}</span>
            </div>
            <div className="perf-segment average">
              <span>Average (70-79%)</span>
              <span>{staffMembers.filter(s => s.performance >= 70 && s.performance < 80).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStaffList = () => (
    <div className="staff-list">
      <div className="list-header">
        <h3>All Staff Members</h3>
        <button 
          className="add-staff-btn"
          onClick={() => setShowAddStaff(true)}
        >
          + Add Staff Member
        </button>
      </div>

      <div className="staff-grid">
        {staffMembers.map(staff => (
          <div key={staff.id} className="staff-card" onClick={() => setSelectedStaff(staff)}>
            <div className="staff-avatar">
              <img src={staff.avatar} alt={staff.name} />
              <div 
                className="status-indicator"
                style={{ backgroundColor: getStatusColor(staff.status) }}
              ></div>
            </div>
            <div className="staff-info">
              <h4>{staff.name}</h4>
              <p className="staff-role">{staff.role}</p>
              <p className="staff-dept">{staff.department}</p>
              <div className="staff-metrics">
                <span className="performance">Performance: {staff.performance}%</span>
                <span className="experience">Exp: {staff.experience}</span>
              </div>
              <div className="staff-status" style={{ color: getStatusColor(staff.status) }}>
                {staff.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="staff-schedule">
      <h3>Staff Schedule Overview</h3>
      <div className="schedule-grid">
        {shifts.map(shift => (
          <div key={shift} className="shift-block">
            <h4>{shift}</h4>
            <div className="shift-staff">
              {staffMembers
                .filter(s => s.shift === shift && s.status === "Active")
                .map(staff => (
                  <div key={staff.id} className="shift-member">
                    <img src={staff.avatar} alt={staff.name} />
                    <div>
                      <p>{staff.name}</p>
                      <span>{staff.role}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="staff-page">
      <div className="staff-header">
        <h1>Staff Management</h1>
        <p>
          {user?.role === "hospitalOwner" 
            ? "Manage your hospital staff, schedules, and performance" 
            : "View staff information and schedules"}
        </p>
      </div>

      <div className="staff-tabs">
        <button 
          className={activeTab === "overview" ? "tab active" : "tab"}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button 
          className={activeTab === "staff" ? "tab active" : "tab"}
          onClick={() => setActiveTab("staff")}
        >
          Staff List
        </button>
        <button 
          className={activeTab === "schedule" ? "tab active" : "tab"}
          onClick={() => setActiveTab("schedule")}
        >
          Schedule
        </button>
        <button 
          className={activeTab === "reports" ? "tab active" : "tab"}
          onClick={() => setActiveTab("reports")}
        >
          Reports
        </button>
      </div>

      <div className="staff-content">
        {activeTab === "overview" && renderOverview()}
        {activeTab === "staff" && renderStaffList()}
        {activeTab === "schedule" && renderSchedule()}
        {activeTab === "reports" && (
          <div className="staff-reports">
            <h3>Staff Reports & Analytics</h3>
            <div className="reports-grid">
              <div className="report-card">
                <h4>Attendance Report</h4>
                <p>Monthly attendance tracking and analysis</p>
                <button className="report-btn">Generate Report</button>
              </div>
              <div className="report-card">
                <h4>Performance Review</h4>
                <p>Quarterly performance evaluations</p>
                <button className="report-btn">View Reviews</button>
              </div>
              <div className="report-card">
                <h4>Training Records</h4>
                <p>Staff certification and training status</p>
                <button className="report-btn">View Records</button>
              </div>
              <div className="report-card">
                <h4>Payroll Summary</h4>
                <p>Monthly payroll and compensation data</p>
                <button className="report-btn">View Summary</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Staff Modal */}
      {showAddStaff && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Staff Member</h3>
              <button onClick={() => setShowAddStaff(false)} className="close-btn">×</button>
            </div>
            <form onSubmit={handleAddStaff} className="add-staff-form">
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Job Role"
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <select
                  value={newStaff.department}
                  onChange={(e) => setNewStaff({...newStaff, department: e.target.value})}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <select
                  value={newStaff.shift}
                  onChange={(e) => setNewStaff({...newStaff, shift: e.target.value})}
                  required
                >
                  <option value="">Select Shift</option>
                  {shifts.map(shift => (
                    <option key={shift} value={shift}>{shift}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Years of Experience"
                  value={newStaff.experience}
                  onChange={(e) => setNewStaff({...newStaff, experience: e.target.value})}
                  required
                />
                <input
                  type="date"
                  placeholder="Join Date"
                  value={newStaff.joinDate}
                  onChange={(e) => setNewStaff({...newStaff, joinDate: e.target.value})}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Certifications (comma separated)"
                value={newStaff.certifications}
                onChange={(e) => setNewStaff({...newStaff, certifications: e.target.value})}
                className="full-width"
              />
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddStaff(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">Add Staff Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h3>Staff Details - {selectedStaff.name}</h3>
              <button onClick={() => setSelectedStaff(null)} className="close-btn">×</button>
            </div>
            <div className="staff-details">
              <div className="detail-header">
                <img src={selectedStaff.avatar} alt={selectedStaff.name} className="detail-avatar" />
                <div className="detail-info">
                  <h2>{selectedStaff.name}</h2>
                  <p className="detail-role">{selectedStaff.role}</p>
                  <p className="detail-dept">{selectedStaff.department} Department</p>
                  <div 
                    className="detail-status"
                    style={{ color: getStatusColor(selectedStaff.status) }}
                  >
                    {selectedStaff.status}
                  </div>
                </div>
              </div>
              
              <div className="detail-grid">
                <div className="detail-section">
                  <h4>Contact Information</h4>
                  <p><strong>Email:</strong> {selectedStaff.email}</p>
                  <p><strong>Phone:</strong> {selectedStaff.phone}</p>
                </div>
                
                <div className="detail-section">
                  <h4>Work Details</h4>
                  <p><strong>Department:</strong> {selectedStaff.department}</p>
                  <p><strong>Shift:</strong> {selectedStaff.shift}</p>
                  <p><strong>Join Date:</strong> {selectedStaff.joinDate}</p>
                  <p><strong>Experience:</strong> {selectedStaff.experience}</p>
                </div>
                
                <div className="detail-section">
                  <h4>Performance</h4>
                  <div className="performance-meter">
                    <div 
                      className="performance-fill"
                      style={{ width: `${selectedStaff.performance}%` }}
                    ></div>
                  </div>
                  <p>{selectedStaff.performance}% Overall Rating</p>
                </div>
                
                <div className="detail-section">
                  <h4>Certifications</h4>
                  <div className="certifications">
                    {selectedStaff.certifications.map((cert, index) => (
                      <span key={index} className="cert-badge">{cert}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
