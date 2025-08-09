import React, { useEffect, useState } from "react";
import HealthChart from "../components/Charts/HealthChart";
import { useAuth } from "../context/AuthContext";
import { useDashboard } from "../hooks/useApi";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const { stats, recentPatients, todayAppointments, loading, error } = useDashboard();

  // Dynamic data based on user role and API data
  const getDashboardData = () => {
    if (!stats) {
      // Default data while loading
      switch (user?.role) {
        case "doctor":
          return [
            { title: "My Patients", value: "...", icon: "👥" },
            { title: "Today's Appointments", value: "...", icon: "📅" },
            { title: "Pending Reviews", value: "...", icon: "📋" },
            { title: "Completed Checkups", value: "...", icon: "✅" },
          ];
        case "hospitalOwner":
          return [
            { title: "Total Patients", value: "...", icon: "👥" },
            { title: "Total Doctors", value: "...", icon: "�‍⚕️" },
            { title: "Total Staff", value: "...", icon: "👥" },
            { title: "Today's Appointments", value: "...", icon: "📅" },
          ];
        case "staff":
          return [
            { title: "Total Patients", value: "...", icon: "📝" },
            { title: "Today's Appointments", value: "...", icon: "📅" },
            { title: "Pending Tasks", value: "...", icon: "⏳" },
            { title: "Completed Tasks", value: "...", icon: "✅" },
          ];
        default: // patient
          return [
            { title: "Upcoming Appointments", value: "...", icon: "📅" },
            { title: "Health Reports", value: "...", icon: "📋" },
            { title: "Prescriptions", value: "...", icon: "💊" },
            { title: "Health Score", value: "...", icon: "❤️" },
          ];
      }
    }

    // Real data from API
    switch (user?.role) {
      case "doctor":
        return [
          { title: "My Patients", value: stats.totalPatients || 0, icon: "👥" },
          { title: "Today's Appointments", value: stats.todayAppointments || 0, icon: "📅" },
          { title: "Upcoming Appointments", value: stats.upcomingAppointments || 0, icon: "📋" },
          { title: "Completed Appointments", value: stats.completedAppointments || 0, icon: "✅" },
        ];
      case "hospitalOwner":
        return [
          { title: "Total Patients", value: stats.totalPatients || 0, icon: "�" },
          { title: "Total Doctors", value: stats.totalDoctors || 0, icon: "👨‍⚕️" },
          { title: "Total Staff", value: stats.totalStaff || 0, icon: "👥" },
          { title: "Today's Appointments", value: stats.todayAppointments || 0, icon: "�" },
        ];
      case "staff":
        return [
          { title: "Total Patients", value: stats.totalPatients || 0, icon: "📝" },
          { title: "Today's Appointments", value: stats.todayAppointments || 0, icon: "📅" },
          { title: "Upcoming Appointments", value: stats.upcomingAppointments || 0, icon: "⏳" },
          { title: "Completed Appointments", value: stats.completedAppointments || 0, icon: "✅" },
        ];
      default: // patient
        return [
          { title: "Upcoming Appointments", value: stats.upcomingAppointments || 0, icon: "📅" },
          { title: "Total Appointments", value: stats.completedAppointments || 0, icon: "📋" },
          { title: "Prescriptions", value: "0", icon: "💊" },
          { title: "Health Score", value: "Good", icon: "❤️" },
        ];
    }
  };

  const dashboardCards = getDashboardData();

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error loading dashboard: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Welcome back, {user?.name || "User"}! 👋
        </h1>
        <p className="dashboard-welcome">
          Here's what's happening with your {user?.role === "hospitalOwner" ? "hospital" : user?.role === "doctor" ? "practice" : "health"} today.
        </p>
      </div>
      
      <div className="dashboard-cards">
        {dashboardCards.map((card, index) => (
          <div key={index} className="dashboard-card">
            <div className="card-icon">{card.icon}</div>
            <div className="card-content">
              <h3>{card.title}</h3>
              <p className="card-number">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {(user?.role === "doctor" || user?.role === "hospitalOwner") && (
        <div className="dashboard-charts">
          <div className="chart-container">
            <h3 className="chart-title">Health Trends Overview</h3>
            <HealthChart />
          </div>
          
          <div className="chart-container">
            <h3 className="chart-title">Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-icon">👤</span>
                <div className="activity-content">
                  <p className="activity-title">New patient registered</p>
                  <p className="activity-time">2 hours ago</p>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">📋</span>
                <div className="activity-content">
                  <p className="activity-title">Lab report uploaded</p>
                  <p className="activity-time">4 hours ago</p>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">💊</span>
                <div className="activity-content">
                  <p className="activity-title">Prescription updated</p>
                  <p className="activity-time">6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {user?.role === "patient" && (
        <div className="patient-quick-actions">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            <button className="quick-action-btn">
              <span>📅</span>
              Book Appointment
            </button>
            <button className="quick-action-btn">
              <span>📋</span>
              View Reports
            </button>
            <button className="quick-action-btn">
              <span>💊</span>
              My Prescriptions
            </button>
            <button className="quick-action-btn">
              <span>📞</span>
              Contact Doctor
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
