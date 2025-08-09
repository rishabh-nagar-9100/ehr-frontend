// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { user, hasRole, logout } = useAuth();
  const location = useLocation();

  // Navigation items for each role
  const navLinks = {
    patient: [
      { name: "Dashboard", path: "/", icon: "🏠" },
      { name: "My Reports", path: "/reports", icon: "📋" },
      { name: "Prescriptions", path: "/prescriptions", icon: "💊" },
      { name: "Appointments", path: "/appointments", icon: "📅" },
      { name: "Settings", path: "/settings", icon: "⚙️" },
    ],
    doctor: [
      { name: "Dashboard", path: "/", icon: "🏠" },
      { name: "Patients", path: "/patients", icon: "👥" },
      { name: "Appointments", path: "/appointments", icon: "📅" },
      { name: "Reports", path: "/reports", icon: "📋" },
      { name: "Settings", path: "/settings", icon: "⚙️" },
    ],
    hospitalOwner: [
      { name: "Dashboard", path: "/", icon: "🏠" },
      { name: "Doctors", path: "/doctors", icon: "👨‍⚕️" },
      { name: "Staff", path: "/staff", icon: "👥" },
      { name: "Reports", path: "/reports", icon: "📊" },
      { name: "Settings", path: "/settings", icon: "⚙️" },
    ],
    staff: [
      { name: "Dashboard", path: "/", icon: "🏠" },
      { name: "Patients", path: "/patients", icon: "👥" },
      { name: "Upload Reports", path: "/upload-reports", icon: "📤" },
      { name: "Reminders", path: "/reminders", icon: "🔔" },
      { name: "Settings", path: "/settings", icon: "⚙️" },
    ],
  };

  // Determine which links to show based on user roles
  const getLinksForUser = () => {
    if (hasRole(["patient"])) return navLinks.patient;
    if (hasRole(["doctor"])) return navLinks.doctor;
    if (hasRole(["hospitalOwner"])) return navLinks.hospitalOwner;
    if (hasRole(["staff"])) return navLinks.staff;
    return []; // Return empty array if no role matches
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>🏥 EHR System</h2>
        {user && (
          <div className="user-info">
            <p className="user-name">Welcome, {user.name}</p>
            <span className="user-role">{user.role}</span>
          </div>
        )}
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {getLinksForUser().map((link, index) => (
            <li key={index}>
              <Link 
                to={link.path} 
                className={location.pathname === link.path ? "active" : ""}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-text">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <span className="nav-icon">🚪</span>
          <span className="nav-text">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;