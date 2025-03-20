import React, { useRef } from "react";
import "../styles/DashboardOrganizers.css";

const DashboardOrganizers = () => {
  // References to sections
  const manageEventsRef = useRef(null);
  const analyticsRef = useRef(null);
  const promotionsRef = useRef(null);

  // Scroll to a section smoothly
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="dashboard-container">
      {/* Top Section */}
      <div className="top-section">
        <div className="slogan-section">
          <h2 className="slogan-text">Empower Your Events!</h2>
        </div>
        <div className="profile-section">
          <div className="profile-box"></div>
          <div className="profile-box"></div>
          <div className="profile-box"></div>
        </div>
      </div>

      {/* Middle Section - Summary with Clickable Cards */}
      <div className="summary-section">
        <div className="summary-card" onClick={() => scrollToSection(manageEventsRef)}>
          <p>Manage Events</p>
        </div>
        <div className="summary-card" onClick={() => scrollToSection(analyticsRef)}>
          <p>View Analytics</p>
        </div>
        <div className="summary-card" onClick={() => scrollToSection(promotionsRef)}>
          <p>Create Promotions</p>
        </div>
      </div>

      {/* Section - Manage Events */}
      <div className="section-container" ref={manageEventsRef}>
        <h2 className="section-title">Manage Your Events</h2>
        <p className="section-description">
          Easily create, edit, and manage all your events in one place.
        </p>
      </div>

      {/* Section - View Analytics */}
      <div className="section-container" ref={analyticsRef}>
        <h2 className="section-title">Event Analytics</h2>
        <p className="section-description">
          Gain insights into event performance, attendance, and trends.
        </p>
      </div>

      {/* Section - Create Promotions */}
      <div className="section-container" ref={promotionsRef}>
        <h2 className="section-title">Promote Your Events</h2>
        <p className="section-description">
          Use targeted promotions to increase event visibility and reach.
        </p>
      </div>
    </div>
  );
};

export default DashboardOrganizers;
