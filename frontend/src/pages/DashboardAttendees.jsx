import React from "react";
import "../styles/DashboardAttendees.css";

const DashboardAttendees = () => {
  return (
    <div className="dashboard-container">
      {/* Top Section */}
      <div className="top-section">
        <div className="slogan-section">
          <h2 className="slogan-text">Ideas Change Everything</h2>
        </div>
        <div className="profile-section">
          <div className="profile-box"></div>
          <div className="profile-box"></div>
          <div className="profile-box"></div>
        </div>
      </div>

      {/* Middle Section - Summary */}
      <div className="summary-section">
        <div className="summary-card">
          <p>Register for thousands of events</p>
        </div>
        <div className="summary-card">
          <p>Modify registered events</p>
        </div>
        <div className="summary-card">
          <p>We've got you! Get interesting recommendations</p>
        </div>
      </div>

      {/* Events Section */}
      <div className="events-section">
        <div className="event-box upcoming-events">
          <h3>Upcoming Events</h3>
        </div>
        <div className="event-box registered-events">
          <h3>Registered Events</h3>
        </div>
      </div>

      {/* Recommendation Section */}
      <div className="recommendation-section">
        <h2 className="recommendation-title">Personalized Recommendations</h2>
        <p className="recommendation-text">
          Discover events tailored to your interests!
        </p>
      </div>
    </div>
  );
};

export default DashboardAttendees;
