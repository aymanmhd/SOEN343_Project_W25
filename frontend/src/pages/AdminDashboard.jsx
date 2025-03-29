import React, { useRef } from "react";
import "../styles/AdminDashboard.css";
import { Link } from "react-router-dom";


const AdminDashboard = () => {
  const userManagementRef = useRef(null);
  const systemManagementRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="admin-dashboard-container">
      {/* Hero Section */}
      <div className="dashboard-hero cute">
        <h1 className="dashboard-heading">
          🛠️ Welcome to the <span className="highlight-name">Admin Panel</span>
        </h1>
        <p className="sub-welcome">Manage users, system settings, and more below</p>
        <div className="dashboard-dots">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>

      {/* Prompt */}
      <p className="dashboard-prompt">
        ⚙️ Select a section to manage platform functionalities efficiently.
      </p>

      {/* Action Buttons (Linked) */}
      <div className="dashboard-actions">
        <Link to="/user-management" className="action-box">
          👥 Manage Users
        </Link>
        <Link to="/moderation" className="action-box">
          🖥️ Manage System
        </Link>
        <Link to="/admin-report" className="action-box">
          📊 Reports
        </Link>
        <Link to="/admin-financials" className="action-box">
          💰 Financial
        </Link>

      </div>

      {/* Section - User Management */}
      <div className="dashboard-section" ref={userManagementRef}>
        <h2 className="section-title">👤 User Management</h2>
        <p className="section-subtitle">Oversee accounts, roles, and security.</p>
      </div>

      {/* Section - System Management */}
      <div className="dashboard-section" ref={systemManagementRef}>
        <h2 className="section-title">🔧 System Management</h2>
        <p className="section-subtitle">Configure settings and system tools.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;