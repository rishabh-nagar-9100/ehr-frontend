// src/components/Sidebar.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, hasRole } = useAuth();

  // Navigation items for each role
  const navLinks = {
    patient: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "My Reports", path: "/reports" },
      { name: "Prescriptions", path: "/prescriptions" },
      { name: "Upcoming Appointments", path: "/appointments" },
      { name: "Book Appointment", path: "/book-appointment" },
      { name: "Health Summary", path: "/summary" },
      { name: "Settings", path: "/settings" },
    ],
    doctor: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Patients", path: "/patients" },
      { name: "Appointments", path: "/appointments" },
      { name: "Reports", path: "/reports" },
      { name: "Settings", path: "/settings" },
    ],
    hospitalOwner: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Doctors", path: "/doctors" },
      { name: "Staff", path: "/staff" },
      { name: "Reports", path: "/reports" },
      { name: "Settings", path: "/settings" },
    ],
    staff: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Patients", path: "/patients" },
      { name: "Upload Reports", path: "/upload-reports" },
      { name: "Reminders", path: "/reminders" },
      { name: "Settings", path: "/settings" },
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

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>EHR System</h2>
        {user && <p>Welcome, {user.name}</p>}
      </div>
      <nav className="sidebar-nav">
        <ul>
          {getLinksForUser().map((link, index) => (
            <li key={index}>
              <a href={link.path}>{link.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;