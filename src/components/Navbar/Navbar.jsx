// src/components/Navbar.jsx
import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <input type="text" placeholder="Search..." className="search-bar" />
      <div className="navbar-actions">
        <button className="notification-btn">🔔</button>
        <div className="profile">
          <img src="/profile-placeholder.png" alt="Profile" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
