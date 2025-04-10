import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/AttendeeDashboard.css";

const AttendeeDashboard = () => {
  const { user } = useAuth();
  const displayName = user?.name || "Attendee";
  const dailyStreak = user?.dailyStreak || 0;

  return (
    <div className="attendee-dashboard-container">
      {/* Hero Greeting */}
      <div className="dashboard-hero cute">
        <h1 className="dashboard-heading">
          👋 Welcome back, <span className="highlight-name">{displayName}</span>!
        </h1>
        <p className="sub-welcome">We’re glad to see you again!</p>
        <div className="dashboard-dots">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>

      {/* Show daily streak */}
      <div className="streak-counter">
        <p>🔥 Daily Streak: {dailyStreak} day{dailyStreak !== 1 ? "s" : ""}!</p>
      </div>

      {/* Prompt */}
      <p className="dashboard-prompt">
        ✨ What would you like to do today? Choose an option below to explore, update or share!
      </p>

      {/* Action Buttons */}
      <div className="dashboard-actions">
        <Link to="/events" className="action-box">
          🎟️ Ready to sign up? Register for an event!
        </Link>

        <Link to="/my-events" className="action-box">
          🛠️ Modify your registrations
        </Link>

        <Link to="/networking" className="action-box">
          🌐 Join Networking Space
        </Link>

        <Link to="/resources" className="action-box">
          📚 Browse Resources
        </Link>

        <Link to="/feedback" className="action-box">
          💬 Provide a feedback
        </Link>
      </div>

      {/* Optionally show some “Your Registered Events” if you want,
          or just rely on MyEventsPage */}
      <div className="dashboard-section recommendations-box">
        <h2 className="section-title text-green">🎯 Personalized Recommendations</h2>
        <p className="section-subtitle">
          Discover events just for you 💡 (Imagine an AI recommendation system!)
        </p>
      </div>
    </div>
  );
};

export default AttendeeDashboard;
