import React, { useState, useEffect } from 'react';
import { usePatients } from '../hooks/useApi';
import './Patients.css';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    bloodType: '',
    emergencyContact: '',
    allergies: '',
    medications: '',
    medicalHistory: ''
  });

  const { 
    patients: allPatients = [], 
    loading, 
    error, 
    createPatient, 
    updatePatient, 
    deletePatient,
    fetchPatients 
  } = usePatients();

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const recentPatients = allPatients.filter(patient => {
    if (!patient.lastVisit) return false;
    const lastVisitDate = new Date(patient.lastVisit);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return lastVisitDate >= oneWeekAgo;
  });

  const criticalPatients = allPatients.filter(patient => 
    patient.medicalHistory && (
      patient.medicalHistory.includes("Diabetes") || 
      patient.medicalHistory.includes("Hypertension") ||
      patient.medicalHistory.includes("Stroke") ||
      patient.medicalHistory.includes("Atrial Fibrillation")
    )
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      await createPatient(newPatient);
      setShowAddModal(false);
      resetForm();
      fetchPatients();
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Failed to add patient. Please try again.');
    }
  };

  const handleEditPatient = async (updatedData) => {
    try {
      await updatePatient(selectedPatient.id, updatedData);
      setShowModal(false);
      setSelectedPatient(null);
      fetchPatients();
    } catch (error) {
      console.error('Error updating patient:', error);
      alert('Failed to update patient. Please try again.');
    }
  };

  const handleDeletePatient = async (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deletePatient(patientId);
        fetchPatients();
      } catch (error) {
        console.error('Error deleting patient:', error);
        alert('Failed to delete patient. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setNewPatient({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      bloodType: '',
      emergencyContact: '',
      allergies: '',
      medications: '',
      medicalHistory: ''
    });
  };

  const getFilteredPatients = () => {
    let filtered = allPatients;
    
    if (activeTab === 'recent') {
      filtered = recentPatients;
    } else if (activeTab === 'critical') {
      filtered = criticalPatients;
    }
    
    if (searchTerm) {
      filtered = filtered.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone?.includes(searchTerm)
      );
    }
    
    return filtered;
  };

  const renderPatientCard = (patient) => (
    <div key={patient.id || patient._id} className="patient-card">
      <div className="patient-avatar">
        {patient.avatar || `${patient.firstName?.[0] || ''}${patient.lastName?.[0] || ''}`}
      </div>
      <div className="patient-info">
        <div className="patient-header">
          <h3>{patient.firstName} {patient.lastName}</h3>
          <span className={`status-badge ${patient.status?.toLowerCase() || 'active'}`}>
            {patient.status || 'Active'}
          </span>
        </div>
        <div className="patient-details">
          <div className="detail-row">
            <span className="detail-label">📧 Email:</span>
            <span className="detail-value">{patient.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">📞 Phone:</span>
            <span className="detail-value">{patient.phone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">🎂 DOB:</span>
            <span className="detail-value">{formatDate(patient.dateOfBirth)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">🩸 Blood Type:</span>
            <span className="detail-value">{patient.bloodType || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">🏥 Last Visit:</span>
            <span className="detail-value">{formatDate(patient.lastVisit)}</span>
          </div>
        </div>
      </div>
      <div className="patient-actions">
        <button 
          className="action-btn view-btn"
          onClick={() => {
            setSelectedPatient(patient);
            setShowModal(true);
          }}
        >
          👁️ View
        </button>
        <button 
          className="action-btn delete-btn"
          onClick={() => handleDeletePatient(patient.id || patient._id)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );

  const renderPatientModal = () => (
    showModal && selectedPatient && (
      <div className="modal-overlay" onClick={() => setShowModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Patient Details</h2>
            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
          </div>
          <div className="modal-body">
            <div className="patient-detail-grid">
              <div className="detail-section">
                <h3>Personal Information</h3>
                <div className="detail-row">
                  <strong>Name:</strong> {selectedPatient.firstName} {selectedPatient.lastName}
                </div>
                <div className="detail-row">
                  <strong>Email:</strong> {selectedPatient.email}
                </div>
                <div className="detail-row">
                  <strong>Phone:</strong> {selectedPatient.phone}
                </div>
                <div className="detail-row">
                  <strong>Date of Birth:</strong> {formatDate(selectedPatient.dateOfBirth)}
                </div>
                <div className="detail-row">
                  <strong>Gender:</strong> {selectedPatient.gender}
                </div>
                <div className="detail-row">
                  <strong>Address:</strong> {selectedPatient.address}
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Medical Information</h3>
                <div className="detail-row">
                  <strong>Blood Type:</strong> {selectedPatient.bloodType || 'N/A'}
                </div>
                <div className="detail-row">
                  <strong>Allergies:</strong> {selectedPatient.allergies || 'None'}
                </div>
                <div className="detail-row">
                  <strong>Current Medications:</strong> {selectedPatient.medications || 'None'}
                </div>
                <div className="detail-row">
                  <strong>Medical History:</strong> {selectedPatient.medicalHistory || 'None'}
                </div>
                <div className="detail-row">
                  <strong>Emergency Contact:</strong> {selectedPatient.emergencyContact || 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const renderAddPatientModal = () => (
    showAddModal && (
      <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Add New Patient</h2>
            <button className="close-btn" onClick={() => setShowAddModal(false)}>×</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddPatient} className="add-patient-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    required
                    value={newPatient.firstName}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    required
                    value={newPatient.lastName}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    required
                    value={newPatient.email}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={newPatient.dateOfBirth}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Gender *</label>
                  <select
                    required
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, gender: e.target.value }))}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Address</label>
                  <input
                    type="text"
                    value={newPatient.address}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Blood Type</label>
                  <select
                    value={newPatient.bloodType}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, bloodType: e.target.value }))}
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
                  <label>Emergency Contact</label>
                  <input
                    type="text"
                    value={newPatient.emergencyContact}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, emergencyContact: e.target.value }))}
                    placeholder="Name - Phone"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Allergies</label>
                  <textarea
                    value={newPatient.allergies}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, allergies: e.target.value }))}
                    placeholder="List any known allergies"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Current Medications</label>
                  <textarea
                    value={newPatient.medications}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, medications: e.target.value }))}
                    placeholder="List current medications"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Medical History</label>
                  <textarea
                    value={newPatient.medicalHistory}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, medicalHistory: e.target.value }))}
                    placeholder="Brief medical history"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  ➕ Add Patient
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );

  if (loading) {
    return (
      <div className="patients-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading patients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="patients-page">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Patients</h3>
          <p>{error}</p>
          <button onClick={fetchPatients} className="retry-btn">
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

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
        
        <button 
          className="add-patient-btn"
          onClick={() => setShowAddModal(true)}
        >
          ➕ Add New Patient
        </button>
      </div>

      <div className="patients-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search patients by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
