import React, { useState } from "react";
import "../styles/ModerationPage.css";
import { useAuth } from "../context/AuthContext";

// Mock data for reported content with hardcoded organizers
const mockReports = [
  {
    id: 1,
    reportedBy: "john.doe@example.com",
    type: "Comment",
    content: "This event is a scam!",
    eventTitle: "AI in Education",
    organizer: "Dr. Alice Johnson",
    status: "Pending",
  },
  {
    id: 2,
    reportedBy: "jane.smith@example.com",
    type: "Post",
    content: "Free NFTs at this conference!",
    eventTitle: "Blockchain Summit",
    organizer: "Prof. Mark Li",
    status: "Pending",
  },
  {
    id: 3,
    reportedBy: "lisa.brown@example.com",
    type: "Comment",
    content: "Very unprofessional presentation.",
    eventTitle: "Remote Learning Trends",
    organizer: "Ms. Fatima Al-Karim",
    status: "Pending",
  },
  {
    id: 4,
    reportedBy: "alex.rivera@example.com",
    type: "Post",
    content: "Spammy links shared during the event.",
    eventTitle: "Cybersecurity 101",
    organizer: "Dr. Kevin Tanaka",
    status: "Pending",
  },
];

const ModerationPage = () => {
  const [reports, setReports] = useState(mockReports);
  const { user } = useAuth();

  const handleResolve = (reportId, action) => {
    // BACKEND: Replace with API call to resolve report
    const updatedReports = reports.map((report) =>
      report.id === reportId
        ? { ...report, status: action === "remove" ? "Removed" : "Dismissed" }
        : report
    );
    setReports(updatedReports);
  };

  return (
    <div className="moderation-page-container">
      <h1 className="moderation-title">Content Moderation</h1>
      <p className="moderation-subtitle">
        Review and moderate reported posts or comments across events.
      </p>

      <div className="moderation-table-wrapper">
        <table className="moderation-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Content</th>
              <th>Event</th>
              <th>Organizer</th>
              <th>Reported By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.type}</td>
                <td>{report.content}</td>
                <td>{report.eventTitle}</td>
                <td>{report.organizer}</td>
                <td>{report.reportedBy}</td>
                <td>
                  <span
                    className={`status-badge ${
                      report.status === "Pending"
                        ? "badge-pending"
                        : report.status === "Removed"
                        ? "badge-removed"
                        : "badge-dismissed"
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td>
                  {report.status === "Pending" ? (
                    <div className="moderation-buttons">
                      <button
                        className="btn-remove"
                        onClick={() => handleResolve(report.id, "remove")}
                      >
                        Remove
                      </button>
                      <button
                        className="btn-dismiss"
                        onClick={() => handleResolve(report.id, "dismiss")}
                      >
                        Dismiss
                      </button>
                    </div>
                  ) : (
                    <em>Reviewed</em>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModerationPage;
