import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Appointments.css";

const Appointments = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [bookingForm, setBookingForm] = useState({
    doctor: "",
    department: "",
    reason: "",
    notes: ""
  });

  // Mock data for appointments
  const upcomingAppointments = [
    {
      id: 1,
      date: "2025-08-12",
      time: "10:00 AM",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      reason: "Regular Checkup",
      status: "Confirmed",
      location: "Room 302",
      type: "In-Person"
    },
    {
      id: 2,
      date: "2025-08-15",
      time: "2:30 PM",
      doctor: "Dr. Michael Smith",
      department: "Dermatology",
      reason: "Skin Consultation",
      status: "Pending",
      location: "Room 205",
      type: "Virtual"
    },
    {
      id: 3,
      date: "2025-08-18",
      time: "11:15 AM",
      doctor: "Dr. Emily Wilson",
      department: "Orthopedics",
      reason: "Follow-up",
      status: "Confirmed",
      location: "Room 401",
      type: "In-Person"
    }
  ];

  const pastAppointments = [
    {
      id: 4,
      date: "2025-08-05",
      time: "9:00 AM",
      doctor: "Dr. Robert Brown",
      department: "General Medicine",
      reason: "Annual Physical",
      status: "Completed",
      location: "Room 101",
      type: "In-Person",
      notes: "All vitals normal. Recommended annual follow-up."
    },
    {
      id: 5,
      date: "2025-07-28",
      time: "3:00 PM",
      doctor: "Dr. Lisa Davis",
      department: "Radiology",
      reason: "X-Ray Results",
      status: "Completed",
      location: "Room 150",
      type: "In-Person",
      notes: "X-ray shows minor inflammation. Prescribed medication."
    }
  ];

  const availableTimeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", department: "Cardiology", rating: 4.8 },
    { id: 2, name: "Dr. Michael Smith", department: "Dermatology", rating: 4.9 },
    { id: 3, name: "Dr. Emily Wilson", department: "Orthopedics", rating: 4.7 },
    { id: 4, name: "Dr. Robert Brown", department: "General Medicine", rating: 4.6 },
    { id: 5, name: "Dr. Lisa Davis", department: "Radiology", rating: 4.8 }
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Handle appointment booking logic here
    console.log("Booking appointment:", {
      date: selectedDate,
      time: selectedTimeSlot,
      ...bookingForm
    });
    setShowBookingModal(false);
    // Reset form
    setBookingForm({ doctor: "", department: "", reason: "", notes: "" });
    setSelectedTimeSlot("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed": return "#28a745";
      case "Pending": return "#ffc107";
      case "Completed": return "#17a2b8";
      case "Cancelled": return "#dc3545";
      default: return "#6c757d";
    }
  };

  const getNextAppointment = () => {
    return upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;
  };

  const renderUpcomingTab = () => (
    <div className="appointments-section">
      {upcomingAppointments.length > 0 ? (
        <div className="appointments-list">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-header">
                <div className="appointment-date-time">
                  <span className="appointment-date">📅 {appointment.date}</span>
                  <span className="appointment-time">🕐 {appointment.time}</span>
                </div>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(appointment.status) }}
                >
                  {appointment.status}
                </span>
              </div>
              
              <div className="appointment-details">
                <div className="doctor-info">
                  <h4>👨‍⚕️ {appointment.doctor}</h4>
                  <p className="department">🏥 {appointment.department}</p>
                </div>
                
                <div className="appointment-info">
                  <p><strong>Reason:</strong> {appointment.reason}</p>
                  <p><strong>Location:</strong> {appointment.location}</p>
                  <p><strong>Type:</strong> 
                    <span className={`appointment-type ${appointment.type.toLowerCase()}`}>
                      {appointment.type === "Virtual" ? "💻" : "🏥"} {appointment.type}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="appointment-actions">
                <button className="action-btn reschedule-btn">📅 Reschedule</button>
                <button className="action-btn cancel-btn">❌ Cancel</button>
                {appointment.type === "Virtual" && (
                  <button className="action-btn join-btn">🔗 Join Call</button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-appointments">
          <div className="no-appointments-icon">📅</div>
          <h3>No Upcoming Appointments</h3>
          <p>You don't have any scheduled appointments.</p>
          <button 
            className="book-appointment-btn"
            onClick={() => setShowBookingModal(true)}
          >
            📝 Book New Appointment
          </button>
        </div>
      )}
    </div>
  );

  const renderPastTab = () => (
    <div className="appointments-section">
      <div className="appointments-list">
        {pastAppointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card past">
            <div className="appointment-header">
              <div className="appointment-date-time">
                <span className="appointment-date">📅 {appointment.date}</span>
                <span className="appointment-time">🕐 {appointment.time}</span>
              </div>
              <span 
                className="status-badge" 
                style={{ backgroundColor: getStatusColor(appointment.status) }}
              >
                {appointment.status}
              </span>
            </div>
            
            <div className="appointment-details">
              <div className="doctor-info">
                <h4>👨‍⚕️ {appointment.doctor}</h4>
                <p className="department">🏥 {appointment.department}</p>
              </div>
              
              <div className="appointment-info">
                <p><strong>Reason:</strong> {appointment.reason}</p>
                <p><strong>Location:</strong> {appointment.location}</p>
                {appointment.notes && (
                  <div className="appointment-notes">
                    <strong>Notes:</strong>
                    <p>{appointment.notes}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="appointment-actions">
              <button className="action-btn view-btn">👁️ View Details</button>
              <button className="action-btn download-btn">⬇️ Download Report</button>
              <button className="action-btn rebook-btn">🔄 Book Again</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBookingTab = () => (
    <div className="booking-section">
      <div className="booking-form-container">
        <h3>📝 Book New Appointment</h3>
        
        <form onSubmit={handleBookingSubmit} className="booking-form">
          <div className="form-row">
            <div className="form-group">
              <label>📅 Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label>🏥 Department</label>
              <select
                value={bookingForm.department}
                onChange={(e) => setBookingForm({...bookingForm, department: e.target.value})}
                className="form-input"
                required
              >
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="General Medicine">General Medicine</option>
                <option value="Radiology">Radiology</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>👨‍⚕️ Select Doctor</label>
            <select
              value={bookingForm.doctor}
              onChange={(e) => setBookingForm({...bookingForm, doctor: e.target.value})}
              className="form-input"
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.name}>
                  {doctor.name} - {doctor.department} (⭐ {doctor.rating})
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>🕐 Available Time Slots</label>
            <div className="time-slots-grid">
              {availableTimeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`time-slot ${selectedTimeSlot === slot ? "selected" : ""}`}
                  onClick={() => setSelectedTimeSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label>📝 Reason for Visit</label>
            <input
              type="text"
              value={bookingForm.reason}
              onChange={(e) => setBookingForm({...bookingForm, reason: e.target.value})}
              placeholder="e.g., Regular checkup, Follow-up, Consultation"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label>📄 Additional Notes (Optional)</label>
            <textarea
              value={bookingForm.notes}
              onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
              placeholder="Any specific symptoms, concerns, or information for the doctor"
              className="form-textarea"
              rows="3"
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={!selectedTimeSlot}>
              📝 Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderCalendarTab = () => (
    <div className="calendar-section">
      <div className="calendar-header">
        <h3>📅 Appointment Calendar</h3>
        <div className="calendar-controls">
          <button className="calendar-nav-btn">← Previous</button>
          <span className="calendar-month">August 2025</span>
          <button className="calendar-nav-btn">Next →</button>
        </div>
      </div>
      
      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        
        <div className="calendar-days">
          {/* Simplified calendar - would need proper calendar logic */}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <div key={day} className={`calendar-day ${day === 12 || day === 15 || day === 18 ? "has-appointment" : ""}`}>
              <span className="day-number">{day}</span>
              {(day === 12 || day === 15 || day === 18) && (
                <div className="appointment-indicator">•</div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-dot has-appointment"></span>
          <span>Has Appointments</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot available"></span>
          <span>Available</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="appointments-page">
      <div className="appointments-header">
        <div className="header-content">
          <h1>📅 Appointments</h1>
          <p>Manage your medical appointments and schedule new visits</p>
        </div>
        
        {getNextAppointment() && (
          <div className="next-appointment-card">
            <h4>🔔 Next Appointment</h4>
            <div className="next-appointment-info">
              <p><strong>{getNextAppointment().date}</strong> at <strong>{getNextAppointment().time}</strong></p>
              <p>👨‍⚕️ {getNextAppointment().doctor}</p>
              <p>🏥 {getNextAppointment().department}</p>
            </div>
          </div>
        )}
      </div>

      <div className="appointments-tabs">
        <button 
          className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          📅 Upcoming ({upcomingAppointments.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === "past" ? "active" : ""}`}
          onClick={() => setActiveTab("past")}
        >
          📋 Past ({pastAppointments.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === "book" ? "active" : ""}`}
          onClick={() => setActiveTab("book")}
        >
          📝 Book New
        </button>
        <button 
          className={`tab-btn ${activeTab === "calendar" ? "active" : ""}`}
          onClick={() => setActiveTab("calendar")}
        >
          📅 Calendar
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "upcoming" && renderUpcomingTab()}
        {activeTab === "past" && renderPastTab()}
        {activeTab === "book" && renderBookingTab()}
        {activeTab === "calendar" && renderCalendarTab()}
      </div>
    </div>
  );
};

export default Appointments;
