import React from "react";
import HealthChart from "../components/Charts/HealthChart";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  // Dynamic data based on user role
  const getDashboardData = () => {
    switch (user?.role) {
      case "doctor":
        return [
          { title: "My Patients", value: 45, icon: "👥" },
          { title: "Today's Appointments", value: 12, icon: "📅" },
          { title: "Pending Reviews", value: 7, icon: "📋" },
          { title: "Completed Checkups", value: 23, icon: "✅" },
        ];
      case "hospitalOwner":
        return [
          { title: "Total Revenue", value: "$125K", icon: "💰" },
          { title: "Total Staff", value: 85, icon: "👥" },
          { title: "Departments", value: 12, icon: "🏥" },
          { title: "Monthly Growth", value: "+15%", icon: "📈" },
        ];
      case "staff":
        return [
          { title: "Registered Patients", value: 28, icon: "📝" },
          { title: "Reports Uploaded", value: 15, icon: "📤" },
          { title: "Pending Tasks", value: 5, icon: "⏳" },
          { title: "Completed Tasks", value: 42, icon: "✅" },
        ];
      default: // patient
        return [
          { title: "Upcoming Appointments", value: 2, icon: "📅" },
          { title: "Health Reports", value: 8, icon: "📋" },
          { title: "Prescriptions", value: 3, icon: "💊" },
          { title: "Health Score", value: "85%", icon: "❤️" },
        ];
    }
  };

  const dashboardCards = getDashboardData();

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
