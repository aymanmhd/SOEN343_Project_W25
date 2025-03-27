import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/OrganizerDashboard.css"; // using same soft style

const OrganizerDashboard = () => {
  const { user } = useAuth();
  const displayName = user?.name || "Organizer";

  return (
    <div className="attendee-dashboard-container">
      {/* Hero Greeting */}
      <div className="dashboard-hero cute">
        <h1 className="dashboard-heading">
          🎉 Welcome back, <span className="highlight-name">{displayName}</span>!
        </h1>
        <p className="sub-welcome">Let’s get your events organized and thriving ✨</p>
        <div className="dashboard-dots">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>

      {/* Prompt */}
      <p className="dashboard-prompt">
        🚀 What would you like to do today? Choose from the options below to manage your events.
      </p>

      {/* Action Buttons */}
      <div className="dashboard-actions">
        <Link to="/create-event" className="action-box">
          📝 Create Event
        </Link>
        <Link to="/manage-events" className="action-box">
          🛠️ Manage Events
        </Link>
        <Link to="/promotions" className="action-box">
          📢 Promotions
        </Link>
        <Link to="/analytics" className="action-box">
          📊 Analytics
        </Link>
      </div>

      {/* Optional Section - Dashboard Summary */}
      <div className="dashboard-section recommendations-box">
        <h2 className="section-title text-green">📌 Quick Tip</h2>
        <p className="section-subtitle">
          Keep your event info up to date and track engagement regularly!
        </p>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
