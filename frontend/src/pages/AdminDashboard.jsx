import React from "react";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <div className="admin-wrapper">
        {/* Welcome Box */}
        <div className="admin-welcome-box">
          <h2 className="admin-welcome-title">
            🛡️ Welcome back, <span className="admin-highlight">Admin!</span>
          </h2>
          <p className="admin-subtitle">Ready to manage the system?</p>
          <div className="admin-dots">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
        </div>

        {/* Subheading Prompt */}
        <p className="admin-subheading">
          ⚙️ <i>Choose a section below to manage users or maintain the system!</i>
        </p>

        {/* Action Buttons */}
        <div className="admin-actions">
          <div className="admin-action-card">👥 User Management</div>
          <div className="admin-action-card">🧩 System Settings</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
