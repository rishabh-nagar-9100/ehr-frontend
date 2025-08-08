import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = ({ children }) => {
  const { user } = useAuth(); // get logged-in user & role

  return (
    <div className="dashboard-layout flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role={user?.role} />

      {/* Main area */}
      <div className="flex flex-col flex-1">
        {/* Top Navbar */}
        <Navbar />

        {/* Content Area */}
        <main className="p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
