import React, { useState, useEffect, useRef } from "react";
import "../styles/FeedbackPage.css";
import { useAuth } from "../context/AuthContext";

const mockEventList = [
    "Intro to Machine Learning",
    "Cybersecurity Basics",
    "Web Dev Bootcamp",
  ];
  

const mockFeedbackData = [
  {
    eventId: 1,
    eventName: "AI in Education Summit",
    rating: 4,
    comment: "Great insights into the future of AI!",
    tags: ["Inspiring", "Innovative"],
    date: "2025-03-01",
  },
  {
    eventId: 2,
    eventName: "Sustainable Learning Environments",
    rating: 5,
    comment: "Well-organized and inspiring.",
    tags: ["Sustainable", "Thoughtful"],
    date: "2025-02-20",
  },
];

const tagOptions = ["Inspiring", "Technical", "Fun", "Well-Organized", "Interactive"];

const FeedbackPage = () => {
  const { user } = useAuth();
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    eventName: "",
    rating: "",
    comment: "",
    tags: [],
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(null);
  const feedbackEndRef = useRef(null);

  useEffect(() => {
    // BACKEND: Replace with API call to fetch feedback
    setFeedbackList(mockFeedbackData);
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

    const newEntry = {
      ...newFeedback,
      date: new Date().toISOString().split("T")[0],
      eventId: Math.random().toFixed(5),
    };

    setFeedbackList([newEntry, ...feedbackList]);
    setNewFeedback({ eventName: "", rating: "", comment: "", tags: [] });
    setCharCount(0);
    setSuccessMsg("✅ Feedback submitted successfully!");

    setTimeout(() => setSuccessMsg(""), 3000);

    // Scroll to new feedback
    setTimeout(() => {
      feedbackEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="feedback-page-container">
      <h1 className="feedback-title">Event Feedback</h1>
      <p className="feedback-subtitle">We value your thoughts. Share your feedback!</p>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <select
          name="eventName"
          value={newFeedback.eventName}
          onChange={handleInputChange}
          className="feedback-select"
          required
        >
          <option value="">Select Event</option>
          {mockEventList.map((event, idx) => (
            <option key={idx} value={event}>
              {event}
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
        onClick={() =>
          setNewFeedback({ ...newFeedback, rating: star })
        }
        onMouseEnter={() => setHoveredRating(star)}
        onMouseLeave={() => setHoveredRating(null)}
      >
        ★
      </span>
    ))}
  </div>
</div>

        {/* Tag Buttons */}
        <div className="tag-selector">
          {tagOptions.map((tag, idx) => (
            <button
              type="button"
              key={idx}
              className={`tag-btn ${
                newFeedback.tags.includes(tag) ? "selected" : ""
              }`}
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
      </form>
      <h2 className="previous-feedback-title">Our Previous Feedbacks</h2>


      <div className="feedback-list">
        {feedbackList.length === 0 ? (
          <p className="no-feedback">No feedback submitted yet.</p>
        ) : (
          feedbackList.map((fb) => (
            <div className="feedback-card" key={fb.eventId}>
              <h3 className="feedback-event">{fb.eventName}</h3>
              <p className="feedback-rating">{"★".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)}</p>
              <p className="feedback-comment">"{fb.comment}"</p>
              {fb.tags?.length > 0 && (
                <p className="feedback-tags">Tags: {fb.tags.join(", ")}</p>
              )}
              <p className="feedback-date">Submitted on: {fb.date}</p>
            </div>
          ))
        )}
        <div ref={feedbackEndRef}></div>
      </div>
    </div>
  );
};

export default FeedbackPage;
