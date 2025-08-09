import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Patients.css";

const Patients = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatientForm, setNewPatientForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    emergencyContact: "",
    bloodType: "",
    allergies: "",
    medications: "",
    medicalHistory: ""
  });

  // Mock data for patients
  const allPatients = [
    {
      id: 1,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@email.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1985-03-15",
      gender: "Female",
      address: "123 Main St, Anytown, USA",
      bloodType: "A+",
      lastVisit: "2025-08-01",
      nextAppointment: "2025-08-15",
      status: "Active",
      emergencyContact: "Bob Johnson - +1 (555) 987-6543",
      allergies: "Penicillin, Peanuts",
      medications: "Lisinopril 10mg",
      medicalHistory: "Hypertension, Diabetes Type 2",
      avatar: "AJ"
    },
    {
      id: 2,
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@email.com",
      phone: "+1 (555) 234-5678",
      dateOfBirth: "1978-07-22",
      gender: "Male",
      address: "456 Oak Ave, Somewhere, USA",
      bloodType: "O-",
      lastVisit: "2025-07-28",
      nextAppointment: "2025-08-20",
      status: "Active",
      emergencyContact: "Sarah Brown - +1 (555) 876-5432",
      allergies: "Shellfish",
      medications: "Metformin 500mg, Aspirin 81mg",
      medicalHistory: "Diabetes Type 2, High Cholesterol",
      avatar: "MB"
    },
    {
      id: 3,
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 345-6789",
      dateOfBirth: "1992-11-08",
      gender: "Female",
      address: "789 Pine St, Elsewhere, USA",
      bloodType: "B+",
      lastVisit: "2025-08-05",
      nextAppointment: null,
      status: "Active",
      emergencyContact: "James Davis - +1 (555) 765-4321",
      allergies: "None known",
      medications: "Birth Control",
      medicalHistory: "No significant history",
      avatar: "ED"
    },
    {
      id: 4,
      firstName: "Robert",
      lastName: "Wilson",
      email: "robert.wilson@email.com",
      phone: "+1 (555) 456-7890",
      dateOfBirth: "1965-12-03",
      gender: "Male",
      address: "321 Elm Dr, Nowhere, USA",
      bloodType: "AB+",
      lastVisit: "2025-06-15",
      nextAppointment: "2025-08-25",
      status: "Inactive",
      emergencyContact: "Mary Wilson - +1 (555) 654-3210",
      allergies: "Latex, Codeine",
      medications: "Warfarin 5mg, Metoprolol 25mg",
      medicalHistory: "Atrial Fibrillation, Stroke (2020)",
      avatar: "RW"
    },
    {
      id: 5,
      firstName: "Sarah",
      lastName: "Martinez",
      email: "sarah.martinez@email.com",
      phone: "+1 (555) 567-8901",
      dateOfBirth: "1988-09-14",
      gender: "Female",
      address: "654 Maple Ln, Anywhere, USA",
      bloodType: "O+",
      lastVisit: "2025-08-03",
      nextAppointment: "2025-08-18",
      status: "Active",
      emergencyContact: "Carlos Martinez - +1 (555) 543-2109",
      allergies: "Sulfa drugs",
      medications: "Levothyroxine 50mcg",
      medicalHistory: "Hypothyroidism",
      avatar: "SM"
    }
  ];

  const recentPatients = allPatients.filter(patient => {
    const lastVisitDate = new Date(patient.lastVisit);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return lastVisitDate >= oneWeekAgo;
  });

  const criticalPatients = allPatients.filter(patient => 
    patient.medicalHistory.includes("Diabetes") || 
    patient.medicalHistory.includes("Hypertension") ||
    patient.medicalHistory.includes("Stroke") ||
    patient.medicalHistory.includes("Atrial Fibrillation")
  );

  const handleAddPatient = (e) => {
    e.preventDefault();
    console.log("Adding new patient:", newPatientForm);
    setShowAddModal(false);
    // Reset form
    setNewPatientForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      emergencyContact: "",
      bloodType: "",
      allergies: "",
      medications: "",
      medicalHistory: ""
    });
  };

  const getFilteredPatients = () => {
    let patients = [];
    
    switch (activeTab) {
      case "all":
        patients = allPatients;
        break;
      case "recent":
        patients = recentPatients;
        break;
      case "critical":
        patients = criticalPatients;
        break;
      default:
        patients = allPatients;
    }

    // Apply search filter
    if (searchTerm) {
      patients = patients.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm)
      );
    }

    // Apply status filter
    if (filterBy !== "all") {
      patients = patients.filter(patient => patient.status.toLowerCase() === filterBy);
    }

    return patients;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "#28a745";
      case "Inactive": return "#6c757d";
      case "Critical": return "#dc3545";
      default: return "#6c757d";
    }
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const renderPatientCard = (patient) => (
    <div key={patient.id} className="patient-card" onClick={() => setSelectedPatient(patient)}>
      <div className="patient-header">
        <div className="patient-avatar">
          <span>{patient.avatar}</span>
        </div>
        <div className="patient-basic-info">
          <h3>{patient.firstName} {patient.lastName}</h3>
          <p className="patient-details">
            👤 {calculateAge(patient.dateOfBirth)} years • {patient.gender} • 🩸 {patient.bloodType}
          </p>
        </div>
        <span 
          className="status-badge" 
          style={{ backgroundColor: getStatusColor(patient.status) }}
        >
          {patient.status}
        </span>
      </div>
      
      <div className="patient-info">
        <div className="info-row">
          <span className="label">📧 Email:</span>
          <span className="value">{patient.email}</span>
        </div>
        <div className="info-row">
          <span className="label">📱 Phone:</span>
          <span className="value">{patient.phone}</span>
        </div>
        <div className="info-row">
          <span className="label">📅 Last Visit:</span>
          <span className="value">{patient.lastVisit}</span>
        </div>
        {patient.nextAppointment && (
          <div className="info-row">
            <span className="label">🔜 Next Appointment:</span>
            <span className="value next-appointment">{patient.nextAppointment}</span>
          </div>
        )}
      </div>
      
      <div className="patient-medical-summary">
        {patient.allergies !== "None known" && (
          <div className="medical-item">
            <strong>⚠️ Allergies:</strong> {patient.allergies}
          </div>
        )}
        {patient.medications && (
          <div className="medical-item">
            <strong>💊 Medications:</strong> {patient.medications}
          </div>
        )}
      </div>
      
      <div className="patient-actions">
        <button className="action-btn view-btn">👁️ View Profile</button>
        <button className="action-btn edit-btn">✏️ Edit</button>
        <button className="action-btn appointment-btn">📅 Schedule</button>
      </div>
    </div>
  );

  const renderPatientModal = () => (
    selectedPatient && (
      <div className="modal-overlay" onClick={() => setSelectedPatient(null)}>
        <div className="patient-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>👤 {selectedPatient.firstName} {selectedPatient.lastName}</h2>
            <button className="close-btn" onClick={() => setSelectedPatient(null)}>✕</button>
          </div>
          
          <div className="modal-content">
            <div className="patient-details-grid">
              <div className="detail-section">
                <h4>📋 Personal Information</h4>
                <div className="detail-item">
                  <strong>Full Name:</strong> {selectedPatient.firstName} {selectedPatient.lastName}
                </div>
                <div className="detail-item">
                  <strong>Age:</strong> {calculateAge(selectedPatient.dateOfBirth)} years
                </div>
                <div className="detail-item">
                  <strong>Gender:</strong> {selectedPatient.gender}
                </div>
                <div className="detail-item">
                  <strong>Blood Type:</strong> {selectedPatient.bloodType}
                </div>
                <div className="detail-item">
                  <strong>Date of Birth:</strong> {selectedPatient.dateOfBirth}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>📞 Contact Information</h4>
                <div className="detail-item">
                  <strong>Email:</strong> {selectedPatient.email}
                </div>
                <div className="detail-item">
                  <strong>Phone:</strong> {selectedPatient.phone}
                </div>
                <div className="detail-item">
                  <strong>Address:</strong> {selectedPatient.address}
                </div>
                <div className="detail-item">
                  <strong>Emergency Contact:</strong> {selectedPatient.emergencyContact}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>🏥 Medical Information</h4>
                <div className="detail-item">
                  <strong>Allergies:</strong> {selectedPatient.allergies}
                </div>
                <div className="detail-item">
                  <strong>Current Medications:</strong> {selectedPatient.medications}
                </div>
                <div className="detail-item">
                  <strong>Medical History:</strong> {selectedPatient.medicalHistory}
                </div>
                <div className="detail-item">
                  <strong>Last Visit:</strong> {selectedPatient.lastVisit}
                </div>
                {selectedPatient.nextAppointment && (
                  <div className="detail-item">
                    <strong>Next Appointment:</strong> {selectedPatient.nextAppointment}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn edit-btn">✏️ Edit Patient</button>
            <button className="modal-action-btn appointment-btn">📅 Schedule Appointment</button>
            <button className="modal-action-btn records-btn">📋 View Records</button>
          </div>
        </div>
      </div>
    )
  );

  const renderAddPatientModal = () => (
    showAddModal && (
      <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
        <div className="add-patient-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>➕ Add New Patient</h2>
            <button className="close-btn" onClick={() => setShowAddModal(false)}>✕</button>
          </div>
          
          <form onSubmit={handleAddPatient} className="add-patient-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={newPatientForm.firstName}
                  onChange={(e) => setNewPatientForm({...newPatientForm, firstName: e.target.value})}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={newPatientForm.lastName}
                  onChange={(e) => setNewPatientForm({...newPatientForm, lastName: e.target.value})}
                  className="form-input"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>📧 Email</label>
                <input
                  type="email"
                  value={newPatientForm.email}
                  onChange={(e) => setNewPatientForm({...newPatientForm, email: e.target.value})}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>📱 Phone</label>
                <input
                  type="tel"
                  value={newPatientForm.phone}
                  onChange={(e) => setNewPatientForm({...newPatientForm, phone: e.target.value})}
                  className="form-input"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>📅 Date of Birth</label>
                <input
                  type="date"
                  value={newPatientForm.dateOfBirth}
                  onChange={(e) => setNewPatientForm({...newPatientForm, dateOfBirth: e.target.value})}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>⚥ Gender</label>
                <select
                  value={newPatientForm.gender}
                  onChange={(e) => setNewPatientForm({...newPatientForm, gender: e.target.value})}
                  className="form-input"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>🩸 Blood Type</label>
                <select
                  value={newPatientForm.bloodType}
                  onChange={(e) => setNewPatientForm({...newPatientForm, bloodType: e.target.value})}
                  className="form-input"
                  required
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div className="form-group">
                <label>🚨 Emergency Contact</label>
                <input
                  type="text"
                  value={newPatientForm.emergencyContact}
                  onChange={(e) => setNewPatientForm({...newPatientForm, emergencyContact: e.target.value})}
                  className="form-input"
                  placeholder="Name - Phone"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>🏠 Address</label>
              <textarea
                value={newPatientForm.address}
                onChange={(e) => setNewPatientForm({...newPatientForm, address: e.target.value})}
                className="form-textarea"
                rows="2"
                required
              />
            </div>
            
            <div className="form-group">
              <label>⚠️ Allergies</label>
              <input
                type="text"
                value={newPatientForm.allergies}
                onChange={(e) => setNewPatientForm({...newPatientForm, allergies: e.target.value})}
                className="form-input"
                placeholder="e.g., Penicillin, Peanuts (or 'None known')"
              />
            </div>
            
            <div className="form-group">
              <label>💊 Current Medications</label>
              <textarea
                value={newPatientForm.medications}
                onChange={(e) => setNewPatientForm({...newPatientForm, medications: e.target.value})}
                className="form-textarea"
                rows="2"
                placeholder="List current medications and dosages"
              />
            </div>
            
            <div className="form-group">
              <label>🏥 Medical History</label>
              <textarea
                value={newPatientForm.medicalHistory}
                onChange={(e) => setNewPatientForm({...newPatientForm, medicalHistory: e.target.value})}
                className="form-textarea"
                rows="3"
                placeholder="Significant medical conditions and history"
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                ➕ Add Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );

  return (
    <div className="patients-page">
      <div className="patients-header">
        <div className="header-content">
          <h1>👥 Patients</h1>
          <p>Manage patient records and information</p>
        </div>
        
        <div className="patients-stats">
          <div className="stat-card">
            <div className="stat-number">{allPatients.length}</div>
            <div className="stat-label">Total Patients</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{allPatients.filter(p => p.status === "Active").length}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{recentPatients.length}</div>
            <div className="stat-label">Recent Visits</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{criticalPatients.length}</div>
            <div className="stat-label">Critical Care</div>
          </div>
        </div>
      </div>

      <div className="patients-controls">
        <div className="search-and-filter">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search patients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
        
        <button 
          className="add-patient-btn"
          onClick={() => setShowAddModal(true)}
        >
          ➕ Add New Patient
        </button>
      </div>

      <div className="patients-tabs">
        <button 
          className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          👥 All Patients ({allPatients.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === "recent" ? "active" : ""}`}
          onClick={() => setActiveTab("recent")}
        >
          🕐 Recent Visits ({recentPatients.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === "critical" ? "active" : ""}`}
          onClick={() => setActiveTab("critical")}
        >
          🚨 Critical Care ({criticalPatients.length})
        </button>
      </div>

      <div className="patients-list">
        {getFilteredPatients().length > 0 ? (
          getFilteredPatients().map(patient => renderPatientCard(patient))
        ) : (
          <div className="no-patients">
            <div className="no-patients-icon">👥</div>
            <h3>No Patients Found</h3>
            <p>No patients match your current search criteria.</p>
          </div>
        )}
      </div>

      {renderPatientModal()}
      {renderAddPatientModal()}
    </div>
  );
};

export default Patients;
