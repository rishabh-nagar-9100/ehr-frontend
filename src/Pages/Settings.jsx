import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Settings.css";

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe", 
    email: user?.email || "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    address: "123 Main St, Anytown, USA",
    emergencyContact: "Jane Doe - +1 (555) 987-6543"
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    appointmentReminders: true,
    medicationReminders: true,
    reportAlerts: true,
    marketingEmails: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "private",
    shareDataWithDoctors: true,
    shareDataForResearch: false,
    allowDataExport: true
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profileForm);
    // Handle profile update logic
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    console.log("Security updated:", securityForm);
    // Handle security update logic
  };

  const handleExportData = () => {
    console.log("Exporting user data...");
    // Handle data export logic
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Account deletion requested");
      // Handle account deletion logic
    }
  };

  const renderProfileTab = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>👤 Profile Information</h3>
        <p>Update your personal information and contact details</p>
      </div>
      
      <form onSubmit={handleProfileSubmit} className="settings-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={profileForm.firstName}
              onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={profileForm.lastName}
              onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
              className="form-input"
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>📧 Email Address</label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label>📱 Phone Number</label>
            <input
              type="tel"
              value={profileForm.phone}
              onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
              className="form-input"
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>📅 Date of Birth</label>
            <input
              type="date"
              value={profileForm.dateOfBirth}
              onChange={(e) => setProfileForm({...profileForm, dateOfBirth: e.target.value})}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label>⚥ Gender</label>
            <select
              value={profileForm.gender}
              onChange={(e) => setProfileForm({...profileForm, gender: e.target.value})}
              className="form-input"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label>🏠 Address</label>
          <textarea
            value={profileForm.address}
            onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
            className="form-textarea"
            rows="3"
            required
          />
        </div>
        
        <div className="form-group">
          <label>🚨 Emergency Contact</label>
          <input
            type="text"
            value={profileForm.emergencyContact}
            onChange={(e) => setProfileForm({...profileForm, emergencyContact: e.target.value})}
            className="form-input"
            placeholder="Name - Phone Number"
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            💾 Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>🔒 Security Settings</h3>
        <p>Manage your password and security preferences</p>
      </div>
      
      <form onSubmit={handleSecuritySubmit} className="settings-form">
        <div className="security-card">
          <h4>🔑 Change Password</h4>
          
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={securityForm.currentPassword}
              onChange={(e) => setSecurityForm({...securityForm, currentPassword: e.target.value})}
              className="form-input"
              placeholder="Enter current password"
            />
          </div>
          
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={securityForm.newPassword}
              onChange={(e) => setSecurityForm({...securityForm, newPassword: e.target.value})}
              className="form-input"
              placeholder="Enter new password"
            />
          </div>
          
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={securityForm.confirmPassword}
              onChange={(e) => setSecurityForm({...securityForm, confirmPassword: e.target.value})}
              className="form-input"
              placeholder="Confirm new password"
            />
          </div>
        </div>
        
        <div className="security-card">
          <h4>🛡️ Two-Factor Authentication</h4>
          <div className="setting-item">
            <div className="setting-info">
              <strong>Enable Two-Factor Authentication</strong>
              <p>Add an extra layer of security to your account</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={securityForm.twoFactorEnabled}
                onChange={(e) => setSecurityForm({...securityForm, twoFactorEnabled: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            🔐 Update Security Settings
          </button>
        </div>
      </form>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>🔔 Notification Preferences</h3>
        <p>Choose how you want to receive notifications</p>
      </div>
      
      <div className="notifications-grid">
        <div className="notification-card">
          <h4>📧 Email Notifications</h4>
          <div className="setting-item">
            <span>General email notifications</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notificationSettings.emailNotifications}
                onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="setting-item">
            <span>Marketing emails</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notificationSettings.marketingEmails}
                onChange={(e) => setNotificationSettings({...notificationSettings, marketingEmails: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="notification-card">
          <h4>📱 Mobile Notifications</h4>
          <div className="setting-item">
            <span>SMS notifications</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notificationSettings.smsNotifications}
                onChange={(e) => setNotificationSettings({...notificationSettings, smsNotifications: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="setting-item">
            <span>Push notifications</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notificationSettings.pushNotifications}
                onChange={(e) => setNotificationSettings({...notificationSettings, pushNotifications: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="notification-card">
          <h4>🏥 Medical Reminders</h4>
          <div className="setting-item">
            <span>Appointment reminders</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notificationSettings.appointmentReminders}
                onChange={(e) => setNotificationSettings({...notificationSettings, appointmentReminders: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="setting-item">
            <span>Medication reminders</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notificationSettings.medicationReminders}
                onChange={(e) => setNotificationSettings({...notificationSettings, medicationReminders: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="setting-item">
            <span>Report alerts</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notificationSettings.reportAlerts}
                onChange={(e) => setNotificationSettings({...notificationSettings, reportAlerts: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>🔐 Privacy & Data</h3>
        <p>Control your privacy settings and data sharing preferences</p>
      </div>
      
      <div className="privacy-cards">
        <div className="privacy-card">
          <h4>👁️ Profile Visibility</h4>
          <div className="radio-group">
            <label className="radio-item">
              <input
                type="radio"
                name="profileVisibility"
                value="public"
                checked={privacySettings.profileVisibility === "public"}
                onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
              />
              <span className="radio-label">
                <strong>Public</strong> - Visible to all users
              </span>
            </label>
            
            <label className="radio-item">
              <input
                type="radio"
                name="profileVisibility"
                value="doctors"
                checked={privacySettings.profileVisibility === "doctors"}
                onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
              />
              <span className="radio-label">
                <strong>Doctors Only</strong> - Visible only to healthcare providers
              </span>
            </label>
            
            <label className="radio-item">
              <input
                type="radio"
                name="profileVisibility"
                value="private"
                checked={privacySettings.profileVisibility === "private"}
                onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
              />
              <span className="radio-label">
                <strong>Private</strong> - Not visible to other users
              </span>
            </label>
          </div>
        </div>
        
        <div className="privacy-card">
          <h4>🔄 Data Sharing</h4>
          <div className="setting-item">
            <div className="setting-info">
              <strong>Share data with doctors</strong>
              <p>Allow healthcare providers to access your medical data</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={privacySettings.shareDataWithDoctors}
                onChange={(e) => setPrivacySettings({...privacySettings, shareDataWithDoctors: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <strong>Share data for research</strong>
              <p>Help improve healthcare by sharing anonymized data</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={privacySettings.shareDataForResearch}
                onChange={(e) => setPrivacySettings({...privacySettings, shareDataForResearch: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <strong>Allow data export</strong>
              <p>Enable downloading your personal health data</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={privacySettings.allowDataExport}
                onChange={(e) => setPrivacySettings({...privacySettings, allowDataExport: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="privacy-card">
          <h4>📥 Data Management</h4>
          <div className="data-actions">
            <button 
              className="data-btn export-btn"
              onClick={handleExportData}
              disabled={!privacySettings.allowDataExport}
            >
              📥 Export My Data
            </button>
            
            <button 
              className="data-btn delete-btn"
              onClick={handleDeleteAccount}
            >
              🗑️ Delete Account
            </button>
          </div>
          
          <div className="data-info">
            <p><strong>Export Data:</strong> Download all your health records and personal information</p>
            <p><strong>Delete Account:</strong> Permanently remove your account and all associated data</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="header-content">
          <h1>⚙️ Settings</h1>
          <p>Manage your account preferences and privacy settings</p>
        </div>
        
        <div className="user-info-card">
          <div className="user-avatar">
            <span>{user?.firstName?.[0] || 'J'}{user?.lastName?.[0] || 'D'}</span>
          </div>
          <div className="user-details">
            <h3>{user?.firstName || 'John'} {user?.lastName || 'Doe'}</h3>
            <p>{user?.role || 'Patient'} • {user?.email || 'john.doe@example.com'}</p>
          </div>
        </div>
      </div>

      <div className="settings-tabs">
        <button 
          className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          👤 Profile
        </button>
        <button 
          className={`tab-btn ${activeTab === "security" ? "active" : ""}`}
          onClick={() => setActiveTab("security")}
        >
          🔒 Security
        </button>
        <button 
          className={`tab-btn ${activeTab === "notifications" ? "active" : ""}`}
          onClick={() => setActiveTab("notifications")}
        >
          🔔 Notifications
        </button>
        <button 
          className={`tab-btn ${activeTab === "privacy" ? "active" : ""}`}
          onClick={() => setActiveTab("privacy")}
        >
          🔐 Privacy
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "profile" && renderProfileTab()}
        {activeTab === "security" && renderSecurityTab()}
        {activeTab === "notifications" && renderNotificationsTab()}
        {activeTab === "privacy" && renderPrivacyTab()}
      </div>
    </div>
  );
};

export default Settings;
