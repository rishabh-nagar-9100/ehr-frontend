// src/components/Navbar.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString([], { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="datetime-info">
          <span className="current-time">{getCurrentTime()}</span>
          <span className="current-date">{getCurrentDate()}</span>
        </div>
      </div>

      <div className="navbar-center">
        <form onSubmit={handleSearch} className="search-form">
          <input 
            type="text" 
            placeholder="Search patients, doctors, reports..." 
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>
      </div>

      <div className="navbar-actions">
        <button className="notification-btn" title="Notifications">
          🔔
          <span className="notification-badge">3</span>
        </button>
        
        <div className="profile-section">
          <div className="profile-info">
            <span className="profile-name">{user?.name || "User"}</span>
            <span className="profile-role">{user?.role || "Role"}</span>
          </div>
          <div className="profile-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
