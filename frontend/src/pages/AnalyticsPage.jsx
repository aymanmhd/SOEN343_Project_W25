import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/AnalyticsPage.css";

const AnalyticsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState(null);

  // Restrict access to organizers only
  useEffect(() => {
    if (!user || user.role !== "organizer") {
      // If user is not logged in or not an organizer, redirect away
      navigate("/");
    }
  }, [user, navigate]);

  // Mock data fetch for analytics
  useEffect(() => {
    // BACKEND: Replace with a real API call, e.g.:
    // fetch("/api/organizer/analytics")
    //   .then(res => res.json())
    //   .then(data => setAnalyticsData(data));

    const mockAnalytics = {
      overallAttendance: 320,
      averageEngagement: 75, // as a percentage
      averageFeedback: 4.2, // out of 5
      totalRevenue: 12500,
      totalTicketsSold: 450,
      topEvents: [
        {
          eventId: 1,
          eventName: "React Basics Workshop",
          attendance: 100,
          ticketsSold: 100,
          revenue: 2000,
          feedbackScore: 4.5,
        },
        {
          eventId: 2,
          eventName: "Node.js Conference",
          attendance: 140,
          ticketsSold: 140,
          revenue: 3500,
          feedbackScore: 4.1,
        },
        {
          eventId: 3,
          eventName: "Cloud Computing Summit",
          attendance: 80,
          ticketsSold: 80,
          revenue: 3000,
          feedbackScore: 4.3,
        },
      ],
    };

    setAnalyticsData(mockAnalytics);
  }, []);

  if (!analyticsData) {
    return (
      <div className="analytics-page">
        <h2>Loading analytics...</h2>
      </div>
    );
  }

  const {
    overallAttendance,
    averageEngagement,
    averageFeedback,
    totalRevenue,
    totalTicketsSold,
    topEvents,
  } = analyticsData;

  return (
    <div className="analytics-page">
      <h2 className="analytics-title">Organizer Analytics & Reports</h2>

      {/* High-level stats (cards) */}
      <div className="analytics-cards">
        <div className="analytics-card">
          <h3>Total Attendance</h3>
          <p className="analytics-value">{overallAttendance}</p>
        </div>
        <div className="analytics-card">
          <h3>Avg Engagement</h3>
          <p className="analytics-value">{averageEngagement}%</p>
        </div>
        <div className="analytics-card">
          <h3>Avg Feedback</h3>
          <p className="analytics-value">{averageFeedback.toFixed(1)}/5</p>
        </div>
        <div className="analytics-card">
          <h3>Total Revenue</h3>
          <p className="analytics-value">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="analytics-card">
          <h3>Tickets Sold</h3>
          <p className="analytics-value">{totalTicketsSold}</p>
        </div>
      </div>

      {/* Table: Detailed breakdown per event */}
      <div className="analytics-table-wrapper">
        <h3>Top Events Overview</h3>
        <table className="analytics-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Attendance</th>
              <th>Tickets Sold</th>
              <th>Revenue</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {topEvents.map((evt) => (
              <tr key={evt.eventId}>
                <td>{evt.eventName}</td>
                <td>{evt.attendance}</td>
                <td>{evt.ticketsSold}</td>
                <td>${evt.revenue.toLocaleString()}</td>
                <td>{evt.feedbackScore.toFixed(1)}/5</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsPage;
