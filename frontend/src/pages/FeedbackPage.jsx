import React, { useState, useEffect, useRef } from "react";
import "../styles/FeedbackPage.css";
import { useAuth } from "../context/AuthContext";
import { api_private_get, api_private_post } from "../utils/api.js";

const tagOptions = ["Inspiring", "Technical", "Fun", "Well-Organized", "Interactive"];

const FeedbackPage = () => {
  const { user } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    eventId: "",
    rating: "",
    comment: "",
    tags: [],
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [loading, setLoading] = useState({
    events: true,
    feedback: true
  });
  const [error, setError] = useState("");
  const feedbackEndRef = useRef(null);

  useEffect(() => {
    // Fetch registered events
    api_private_get(
      "/users/registrations",
      (response) => {
        setRegisteredEvents(response || []);
        setLoading(prev => ({ ...prev, events: false }));
      },
      (err) => {
        console.error("Error fetching registrations:", err);
        setError("Failed to load registered events");
        setLoading(prev => ({ ...prev, events: false }));
      }
    );

    // Fetch all feedback
    api_private_get(
      "/events/feedback",
      (response) => {
        setFeedbackList(response || []);
        setLoading(prev => ({ ...prev, feedback: false }));
      },
      (err) => {
        console.error("Error fetching feedback:", err);
        setError("Failed to load previous feedback");
        setLoading(prev => ({ ...prev, feedback: false }));
      }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback({ ...newFeedback, [name]: value });

    if (name === "comment") {
      setCharCount(value.length);
    }
  };

  const handleTagToggle = (tag) => {
    const tags = [...newFeedback.tags];
    if (tags.includes(tag)) {
      setNewFeedback({ ...newFeedback, tags: tags.filter((t) => t !== tag) });
    } else {
      setNewFeedback({ ...newFeedback, tags: [...tags, tag] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!newFeedback.eventId || !newFeedback.rating || !newFeedback.comment) {
      setError("Please fill in all required fields");
      return;
    }

    const payload = {
      eventId: newFeedback.eventId,
      rating: Number(newFeedback.rating),
      tags: newFeedback.tags,
      comment: newFeedback.comment
    };

    api_private_post(
      "/events/feedback",
      payload,
      (response) => {
        setSuccessMsg("✅ Feedback submitted successfully!");
        setNewFeedback({ eventId: "", rating: "", comment: "", tags: [] });
        setCharCount(0);
        
        // Refresh feedback list
        api_private_get(
          "/events/feedback",
          (response) => setFeedbackList(response || []),
          (err) => console.error("Error refreshing feedback:", err)
        );

        setTimeout(() => {
          feedbackEndRef.current?.scrollIntoView({ behavior: "smooth" });
          setSuccessMsg("");
        }, 3000);
      },
      (err) => {
        console.error("Submission error:", err);
        setError("Failed to submit feedback. Please try again.");
      }
    );
  };

  if (loading.events || loading.feedback) {
    return <div className="loading-container">Loading data...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="btn-retry">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="feedback-page-container">
      <h1 className="feedback-title">Event Feedback</h1>
      <p className="feedback-subtitle">We value your thoughts. Share your feedback!</p>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <select
          name="eventId"
          value={newFeedback.eventId}
          onChange={handleInputChange}
          className="feedback-select"
          required
        >
          <option value="">Select Event</option>
          {registeredEvents.map((event) => (
            <option key={event.eventID} value={event.eventID}>
              {event.eventTitle}
            </option>
          ))}
        </select>

        <div className="star-rating-container">
          <label className="rating-label">Rating:</label>
          <div className="star-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${
                  star <= (hoveredRating || newFeedback.rating) ? "filled" : ""
                }`}
                onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(null)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="tag-selector">
          {tagOptions.map((tag) => (
            <button
              type="button"
              key={tag}
              className={`tag-btn ${newFeedback.tags.includes(tag) ? "selected" : ""}`}
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <textarea
          name="comment"
          value={newFeedback.comment}
          onChange={handleInputChange}
          placeholder="Your feedback"
          className="feedback-textarea"
          maxLength={500}
          required
        />
        <p className="char-count">{charCount} / 500 characters</p>

        <button type="submit" className="feedback-submit-btn">
          Submit Feedback
        </button>
        {successMsg && <p className="success-msg">{successMsg}</p>}
        {error && <p className="error-msg">{error}</p>}
      </form>

      <h2 className="previous-feedback-title">Community Feedbacks</h2>
      <div className="feedback-list">
        {feedbackList.length === 0 ? (
          <p className="no-feedback">No feedback submitted yet.</p>
        ) : (
          feedbackList.map((fb) => (
            <div className="feedback-card" key={fb.feedbackId}>
              <h3 className="feedback-event">{fb.eventTitle}</h3>
              <p className="feedback-rating">
                {"★".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)}
              </p>
              <p className="feedback-comment">"{fb.comment}"</p>
              {fb.tags?.length > 0 && (
                <p className="feedback-tags">Tags: {fb.tags.join(", ")}</p>
              )}
              <p className="feedback-date">
                Submitted on: {new Date(fb.submittedOn).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
        <div ref={feedbackEndRef}></div>
      </div>
    </div>
  );
};

export default FeedbackPage;