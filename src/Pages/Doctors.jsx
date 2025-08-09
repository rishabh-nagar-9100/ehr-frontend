import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Doctors.css";

const Doctors = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newDoctorForm, setNewDoctorForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialization: "",
    department: "",
    licenseNumber: "",
    experience: "",
    education: "",
    availability: "",
    consultationFee: "",
    rating: "",
    bio: ""
  });

  // Mock data for doctors
  const allDoctors = [
    {
      id: 1,
      firstName: "Dr. Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@hospital.com",
      phone: "+1 (555) 123-4567",
      specialization: "Cardiology",
      department: "Cardiology",
      licenseNumber: "MD123456",
      experience: "15 years",
      education: "Harvard Medical School",
      availability: "Mon-Fri 9AM-5PM",
      consultationFee: "$200",
      rating: 4.8,
      status: "Active",
      patientsCount: 45,
      appointmentsToday: 8,
      bio: "Specialist in cardiovascular diseases with extensive experience in cardiac surgery and interventional cardiology.",
      avatar: "SJ"
    },
    {
      id: 2,
      firstName: "Dr. Michael",
      lastName: "Smith",
      email: "michael.smith@hospital.com",
      phone: "+1 (555) 234-5678",
      specialization: "Dermatology",
      department: "Dermatology",
      licenseNumber: "MD234567",
      experience: "12 years",
      education: "Johns Hopkins University",
      availability: "Mon-Wed 10AM-6PM",
      consultationFee: "$150",
      rating: 4.9,
      status: "Active",
      patientsCount: 38,
      appointmentsToday: 6,
      bio: "Expert in skin disorders, cosmetic dermatology, and dermatological surgery.",
      avatar: "MS"
    },
    {
      id: 3,
      firstName: "Dr. Emily",
      lastName: "Wilson",
      email: "emily.wilson@hospital.com",
      phone: "+1 (555) 345-6789",
      specialization: "Orthopedics",
      department: "Orthopedics",
      licenseNumber: "MD345678",
      experience: "10 years",
      education: "Stanford Medical School",
      availability: "Tue-Sat 8AM-4PM",
      consultationFee: "$180",
      rating: 4.7,
      status: "Active",
      patientsCount: 52,
      appointmentsToday: 10,
      bio: "Specializes in joint replacement, sports medicine, and orthopedic trauma surgery.",
      avatar: "EW"
    },
    {
      id: 4,
      firstName: "Dr. Robert",
      lastName: "Brown",
      email: "robert.brown@hospital.com",
      phone: "+1 (555) 456-7890",
      specialization: "General Medicine",
      department: "Internal Medicine",
      licenseNumber: "MD456789",
      experience: "20 years",
      education: "Yale Medical School",
      availability: "Mon-Fri 7AM-3PM",
      consultationFee: "$120",
      rating: 4.6,
      status: "Active",
      patientsCount: 68,
      appointmentsToday: 12,
      bio: "Primary care physician with expertise in preventive medicine and chronic disease management.",
      avatar: "RB"
    },
    {
      id: 5,
      firstName: "Dr. Lisa",
      lastName: "Davis",
      email: "lisa.davis@hospital.com",
      phone: "+1 (555) 567-8901",
      specialization: "Radiology",
      department: "Radiology",
      licenseNumber: "MD567890",
      experience: "8 years",
      education: "UCLA Medical School",
      availability: "Mon-Thu 9AM-6PM",
      consultationFee: "$160",
      rating: 4.8,
      status: "On Leave",
      patientsCount: 25,
      appointmentsToday: 0,
      bio: "Diagnostic radiologist specializing in MRI, CT scans, and interventional radiology procedures.",
      avatar: "LD"
    }
  ];

  const availableDoctors = allDoctors.filter(doctor => doctor.status === "Active");
  const busyDoctors = allDoctors.filter(doctor => doctor.appointmentsToday >= 8);
  const topRatedDoctors = allDoctors.filter(doctor => doctor.rating >= 4.8);

  const handleAddDoctor = (e) => {
    e.preventDefault();
    console.log("Adding new doctor:", newDoctorForm);
    setShowAddModal(false);
    // Reset form
    setNewDoctorForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialization: "",
      department: "",
      licenseNumber: "",
      experience: "",
      education: "",
      availability: "",
      consultationFee: "",
      rating: "",
      bio: ""
    });
  };

  const getFilteredDoctors = () => {
    let doctors = [];
    
    switch (activeTab) {
      case "all":
        doctors = allDoctors;
        break;
      case "available":
        doctors = availableDoctors;
        break;
      case "busy":
        doctors = busyDoctors;
        break;
      case "top-rated":
        doctors = topRatedDoctors;
        break;
      default:
        doctors = allDoctors;
    }

    // Apply search filter
    if (searchTerm) {
      doctors = doctors.filter(doctor =>
        `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterBy !== "all") {
      doctors = doctors.filter(doctor => doctor.status.toLowerCase().replace(" ", "-") === filterBy);
    }

    return doctors;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "#28a745";
      case "On Leave": return "#ffc107";
      case "Inactive": return "#6c757d";
      default: return "#6c757d";
    }
  };

  const getRatingStars = (rating) => {
    return "⭐".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "⭐" : "");
  };

  const renderDoctorCard = (doctor) => (
    <div key={doctor.id} className="doctor-card" onClick={() => setSelectedDoctor(doctor)}>
      <div className="doctor-header">
        <div className="doctor-avatar">
          <span>{doctor.avatar}</span>
        </div>
        <div className="doctor-basic-info">
          <h3>{doctor.firstName} {doctor.lastName}</h3>
          <p className="doctor-specialization">🏥 {doctor.specialization}</p>
          <p className="doctor-department">📋 {doctor.department}</p>
        </div>
        <span 
          className="status-badge" 
          style={{ backgroundColor: getStatusColor(doctor.status) }}
        >
          {doctor.status}
        </span>
      </div>
      
      <div className="doctor-stats">
        <div className="stat-item">
          <span className="stat-label">👥 Patients</span>
          <span className="stat-value">{doctor.patientsCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">📅 Today</span>
          <span className="stat-value">{doctor.appointmentsToday}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">⭐ Rating</span>
          <span className="stat-value">{doctor.rating}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">💰 Fee</span>
          <span className="stat-value">{doctor.consultationFee}</span>
        </div>
      </div>
      
      <div className="doctor-info">
        <div className="info-row">
          <span className="label">📧 Email:</span>
          <span className="value">{doctor.email}</span>
        </div>
        <div className="info-row">
          <span className="label">📱 Phone:</span>
          <span className="value">{doctor.phone}</span>
        </div>
        <div className="info-row">
          <span className="label">🕐 Availability:</span>
          <span className="value">{doctor.availability}</span>
        </div>
        <div className="info-row">
          <span className="label">🎓 Experience:</span>
          <span className="value">{doctor.experience}</span>
        </div>
      </div>
      
      <div className="doctor-actions">
        <button className="action-btn view-btn">👁️ View Profile</button>
        <button className="action-btn schedule-btn">📅 Schedule</button>
        {(user?.role === "hospitalOwner" || user?.role === "staff") && (
          <button className="action-btn manage-btn">⚙️ Manage</button>
        )}
      </div>
    </div>
  );

  const renderDoctorModal = () => (
    selectedDoctor && (
      <div className="modal-overlay" onClick={() => setSelectedDoctor(null)}>
        <div className="doctor-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>👨‍⚕️ {selectedDoctor.firstName} {selectedDoctor.lastName}</h2>
            <button className="close-btn" onClick={() => setSelectedDoctor(null)}>✕</button>
          </div>
          
          <div className="modal-content">
            <div className="doctor-details-grid">
              <div className="detail-section">
                <h4>👨‍⚕️ Professional Information</h4>
                <div className="detail-item">
                  <strong>Full Name:</strong> {selectedDoctor.firstName} {selectedDoctor.lastName}
                </div>
                <div className="detail-item">
                  <strong>Specialization:</strong> {selectedDoctor.specialization}
                </div>
                <div className="detail-item">
                  <strong>Department:</strong> {selectedDoctor.department}
                </div>
                <div className="detail-item">
                  <strong>License Number:</strong> {selectedDoctor.licenseNumber}
                </div>
                <div className="detail-item">
                  <strong>Experience:</strong> {selectedDoctor.experience}
                </div>
                <div className="detail-item">
                  <strong>Education:</strong> {selectedDoctor.education}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>📞 Contact & Availability</h4>
                <div className="detail-item">
                  <strong>Email:</strong> {selectedDoctor.email}
                </div>
                <div className="detail-item">
                  <strong>Phone:</strong> {selectedDoctor.phone}
                </div>
                <div className="detail-item">
                  <strong>Availability:</strong> {selectedDoctor.availability}
                </div>
                <div className="detail-item">
                  <strong>Consultation Fee:</strong> {selectedDoctor.consultationFee}
                </div>
                <div className="detail-item">
                  <strong>Status:</strong> {selectedDoctor.status}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>📊 Performance & Stats</h4>
                <div className="detail-item">
                  <strong>Rating:</strong> {selectedDoctor.rating} {getRatingStars(selectedDoctor.rating)}
                </div>
                <div className="detail-item">
                  <strong>Total Patients:</strong> {selectedDoctor.patientsCount}
                </div>
                <div className="detail-item">
                  <strong>Appointments Today:</strong> {selectedDoctor.appointmentsToday}
                </div>
                <div className="bio-section">
                  <strong>Biography:</strong>
                  <p>{selectedDoctor.bio}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-actions">
            <button className="modal-action-btn schedule-btn">📅 Schedule Appointment</button>
            <button className="modal-action-btn message-btn">💬 Send Message</button>
            {(user?.role === "hospitalOwner" || user?.role === "staff") && (
              <>
                <button className="modal-action-btn edit-btn">✏️ Edit Profile</button>
                <button className="modal-action-btn manage-btn">⚙️ Manage Schedule</button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );

  const renderAddDoctorModal = () => (
    showAddModal && (
      <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
        <div className="add-doctor-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>➕ Add New Doctor</h2>
            <button className="close-btn" onClick={() => setShowAddModal(false)}>✕</button>
          </div>
          
          <form onSubmit={handleAddDoctor} className="add-doctor-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={newDoctorForm.firstName}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, firstName: e.target.value})}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={newDoctorForm.lastName}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, lastName: e.target.value})}
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
                  value={newDoctorForm.email}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, email: e.target.value})}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>📱 Phone</label>
                <input
                  type="tel"
                  value={newDoctorForm.phone}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, phone: e.target.value})}
                  className="form-input"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>🏥 Specialization</label>
                <select
                  value={newDoctorForm.specialization}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, specialization: e.target.value})}
                  className="form-input"
                  required
                >
                  <option value="">Select Specialization</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="General Medicine">General Medicine</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Psychiatry">Psychiatry</option>
                </select>
              </div>
              <div className="form-group">
                <label>📋 Department</label>
                <select
                  value={newDoctorForm.department}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, department: e.target.value})}
                  className="form-input"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Internal Medicine">Internal Medicine</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Surgery">Surgery</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>🆔 License Number</label>
                <input
                  type="text"
                  value={newDoctorForm.licenseNumber}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, licenseNumber: e.target.value})}
                  className="form-input"
                  placeholder="e.g., MD123456"
                  required
                />
              </div>
              <div className="form-group">
                <label>🎓 Experience</label>
                <input
                  type="text"
                  value={newDoctorForm.experience}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, experience: e.target.value})}
                  className="form-input"
                  placeholder="e.g., 10 years"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>🎓 Education</label>
              <input
                type="text"
                value={newDoctorForm.education}
                onChange={(e) => setNewDoctorForm({...newDoctorForm, education: e.target.value})}
                className="form-input"
                placeholder="e.g., Harvard Medical School"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>🕐 Availability</label>
                <input
                  type="text"
                  value={newDoctorForm.availability}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, availability: e.target.value})}
                  className="form-input"
                  placeholder="e.g., Mon-Fri 9AM-5PM"
                  required
                />
              </div>
              <div className="form-group">
                <label>💰 Consultation Fee</label>
                <input
                  type="text"
                  value={newDoctorForm.consultationFee}
                  onChange={(e) => setNewDoctorForm({...newDoctorForm, consultationFee: e.target.value})}
                  className="form-input"
                  placeholder="e.g., $150"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>📝 Biography</label>
              <textarea
                value={newDoctorForm.bio}
                onChange={(e) => setNewDoctorForm({...newDoctorForm, bio: e.target.value})}
                className="form-textarea"
                rows="4"
                placeholder="Brief professional biography and specialties"
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                ➕ Add Doctor
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );

  return (
    <div className="doctors-page">
      <div className="doctors-header">
        <div className="header-content">
          <h1>👨‍⚕️ Doctors</h1>
          <p>
            {user?.role === "hospitalOwner" || user?.role === "staff" 
              ? "Manage hospital doctors and staff members" 
              : "Find and connect with healthcare professionals"}
          </p>
        </div>
        
        <div className="doctors-stats">
          <div className="stat-card">
            <div className="stat-number">{allDoctors.length}</div>
            <div className="stat-label">Total Doctors</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{availableDoctors.length}</div>
            <div className="stat-label">Available</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{busyDoctors.length}</div>
            <div className="stat-label">Busy Today</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{topRatedDoctors.length}</div>
            <div className="stat-label">Top Rated</div>
          </div>
        </div>
      </div>

      <div className="doctors-controls">
        <div className="search-and-filter">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search by name, specialization, or department..."
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
            <option value="on-leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        
        {(user?.role === "hospitalOwner" || user?.role === "staff") && (
          <button 
            className="add-doctor-btn"
            onClick={() => setShowAddModal(true)}
          >
            ➕ Add New Doctor
          </button>
        )}
      </div>

      <div className="doctors-tabs">
        <button 
          className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          👨‍⚕️ All Doctors ({allDoctors.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === "available" ? "active" : ""}`}
          onClick={() => setActiveTab("available")}
        >
          ✅ Available ({availableDoctors.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === "busy" ? "active" : ""}`}
          onClick={() => setActiveTab("busy")}
        >
          📅 Busy Today ({busyDoctors.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === "top-rated" ? "active" : ""}`}
          onClick={() => setActiveTab("top-rated")}
        >
          ⭐ Top Rated ({topRatedDoctors.length})
        </button>
      </div>

      <div className="doctors-list">
        {getFilteredDoctors().length > 0 ? (
          getFilteredDoctors().map(doctor => renderDoctorCard(doctor))
        ) : (
          <div className="no-doctors">
            <div className="no-doctors-icon">👨‍⚕️</div>
            <h3>No Doctors Found</h3>
            <p>No doctors match your current search criteria.</p>
          </div>
        )}
      </div>

      {renderDoctorModal()}
      {renderAddDoctorModal()}
    </div>
  );
};

export default Doctors;
