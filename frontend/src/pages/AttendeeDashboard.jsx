import React, { useState, useRef } from "react";
import "../styles/AttendeeDashboard.css";

const AttendeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  // References to sections
  const upcomingRef = useRef(null);
  const registeredRef = useRef(null);
  const recommendationRef = useRef(null);

  // Example event lists
  const upcomingEvents = ["Tech Conference 2025", "AI Expo", "React Summit"];
  const registeredEvents = ["Web Development Workshop", "Cybersecurity Talk"];

  // Scroll to a section smoothly
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

      {/* Middle Section - Summary with Clickable Cards */}
      <div className="summary-section">
        <div className="summary-card" onClick={() => scrollToSection(upcomingRef)}>
          <p>Register for thousands of events</p>
        </div>
        <div className="summary-card" onClick={() => scrollToSection(registeredRef)}>
          <p>Modify registered events</p>
        </div>
        <div className="summary-card" onClick={() => scrollToSection(recommendationRef)}>
          <p>We've got you! Get interesting recommendations</p>
        </div>
      </div>

      {/* Toggle Options */}
      <div className="toggle-options" ref={upcomingRef}>
        <div
          className={`toggle-option ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Events
        </div>
        <div
          className={`toggle-option ${activeTab === "registered" ? "active" : ""}`}
          onClick={() => setActiveTab("registered")}
          ref={registeredRef}
        >
          Registered Events
        </div>
      </div>

      {/* Content Section - Updates Dynamically */}
      <div className="events-content">
        <ul className="event-list">
          {(activeTab === "upcoming" ? upcomingEvents : registeredEvents).map(
            (event, index) => (
              <li key={index}>{index + 1}. {event}</li>
            )
          )}
        </ul>
      </div>

      {/* Recommendation Section */}
      <div className="recommendation-section" ref={recommendationRef}>
        <h2 className="recommendation-title">Personalized Recommendations</h2>
        <p className="recommendation-text">
          Discover events tailored to your interests!
        </p>
      </div>
    </div>
  );
};

export default AttendeeDashboard;
