import React from "react";
import "../styles/OrganizerDashboard.css";

const OrganizerDashboard = () => {
  return (
    <div className="organizer-container">
      <div className="organizer-wrapper">
        {/* Welcome Box */}
        <div className="organizer-welcome-box">
          <h2 className="organizer-welcome-title">
            👋 Welcome back, <span className="organizer-highlight">Organizer!</span>
          </h2>
          <p className="organizer-subtitle">We're glad to see you again!</p>
          <div className="organizer-dots">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
        </div>

        {/* Prompt Text */}
        <p className="organizer-subheading">
          🚀 <i>What would you like to do today? Choose an option below to manage, analyze or promote!</i>
        </p>

        {/* Action Cards */}
        <div className="organizer-actions">
          <div className="organizer-action-card">📅 Manage Events</div>
          <div className="organizer-action-card">📊 View Analytics</div>
          <div className="organizer-action-card">📣 Promotions</div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
