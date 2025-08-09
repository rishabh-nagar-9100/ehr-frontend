import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../context/AuthContext";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const { user } = useAuth(); // get logged-in user & role

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar role={user?.role} />

      {/* Main area */}
      <div className="main-content">
        {/* Top Navbar */}
        <Navbar />

        {/* Content Area */}
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
