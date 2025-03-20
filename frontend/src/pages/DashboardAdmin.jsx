import React, { useRef } from "react";
import "../styles/DashboardAdmin.css";

const DashboardAdmin = () => {
  // References to sections
  const userManagementRef = useRef(null);
  const systemManagementRef = useRef(null);

  // Scroll to a section smoothly
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="dashboard-container">
      {/* Top Section */}
      <div className="top-section">
        <div className="slogan-section">
          <h2 className="slogan-text">Admin Control Panel</h2>
        </div>
        <div className="profile-section">
          <div className="profile-box"></div>
          <div className="profile-box"></div>
          <div className="profile-box"></div>
        </div>
      </div>

      {/* Middle Section - Summary with Clickable Cards */}
      <div className="summary-section">
        <div className="summary-card" onClick={() => scrollToSection(userManagementRef)}>
          <p>Manage Users</p>
        </div>
        <div className="summary-card" onClick={() => scrollToSection(systemManagementRef)}>
          <p>Manage System</p>
        </div>
      </div>

      {/* Section - User Management */}
      <div className="section-container" ref={userManagementRef}>
        <h2 className="section-title">User Management</h2>
        <p className="section-description">
          Oversee user accounts, permissions, and security settings.
        </p>
      </div>

      {/* Section - System Management */}
      <div className="section-container" ref={systemManagementRef}>
        <h2 className="section-title">System Management</h2>
        <p className="section-description">
          Configure system settings, security, and maintenance tools.
        </p>
      </div>
    </div>
  );
};

export default DashboardAdmin;
