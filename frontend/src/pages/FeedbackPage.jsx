import React, { useState, useEffect, useRef } from "react";
import "../styles/FeedbackPage.css";
import { useAuth } from "../context/AuthContext";

// Demo data (replace with actual API calls)
const mockRegisteredEvents = [
  {
    id: "evt-1",
    title: "Intro to Machine Learning",
    description: "Learn the basics of ML concepts.",
  },
  {
    id: "evt-2",
    title: "Cybersecurity Basics",
    description: "Fundamentals of staying safe online.",
  },
  {
    id: "evt-3",
    title: "Web Dev Bootcamp",
    description: "Dive into modern web development.",
  },
];

const mockFeedbackData = [
  {
    eventId: "1",
    eventName: "AI in Education Summit",
    rating: 4,
    comment: "Great insights into the future of AI!",
    tags: ["Inspiring", "Innovative"],
    date: "2025-03-01",
  },
  {
    eventId: "2",
    eventName: "Sustainable Learning Environments",
    rating: 5,
    comment: "Well-organized and inspiring.",
    tags: ["Sustainable", "Thoughtful"],
    date: "2025-02-20",
  },
];

const tagOptions = [
  "Inspiring",
  "Technical",
  "Fun",
  "Well-Organized",
  "Interactive",
];

const FeedbackPage = () => {
  const { user } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    eventId: "",
    rating: 0,
    comment: "",
    tags: [],
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(null);
  const feedbackEndRef = useRef(null);

  // -------------------------------------------
  // On component mount, load the user’s events and any existing feedback
  // -------------------------------------------
  useEffect(() => {
    // EXAMPLE: fetch the events the user (attendee) is registered to
    // e.g., axios.get(`/api/users/${user.id}/registeredEvents`)
    // .then(response => setRegisteredEvents(response.data))
    // .catch(err => console.error(err));

    // For demo, we use mock data:
    setRegisteredEvents(mockRegisteredEvents);

    // EXAMPLE: fetch existing feedback (all or user-specific)
    // e.g., axios.get("/events/feedback")
    //        .then(response => setFeedbackList(response.data))
    //        .catch(err => console.error(err));

    // For demo, we use mock data:
    setFeedbackList(mockFeedbackData);
  }, [user]);

  // -------------------------------------------
  // Handle text-area and star-rating changes
  // -------------------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "comment") {
      setCharCount(value.length);
    }
  };

  const handleTagToggle = (tag) => {
    setNewFeedback((prev) => {
      const tags = [...prev.tags];
      if (tags.includes(tag)) {
        return { ...prev, tags: tags.filter((t) => t !== tag) };
      } else {
        return { ...prev, tags: [...tags, tag] };
      }
    });
  };

  // -------------------------------------------
  // When an event card is clicked, select it
  // -------------------------------------------
  const handleSelectEvent = (eventObj) => {
    setSelectedEvent(eventObj);
    setNewFeedback((prev) => ({
      ...prev,
      eventId: eventObj.id, // Link new feedback to this event’s ID
    }));
  };

  // -------------------------------------------
  // Submitting feedback
  // -------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure we have a valid event selected
    if (!selectedEvent) {
      alert("Please select an event to submit feedback.");
      return;
    }

    // Build the new feedback object
    const newEntry = {
      eventId: newFeedback.eventId,
      eventName: selectedEvent.title,
      rating: newFeedback.rating,
      comment: newFeedback.comment,
      tags: newFeedback.tags,
      date: new Date().toISOString().split("T")[0],
    };

    // POST to backend example:
    // await axios.post("/events/feedback", {
    //   eventId: newFeedback.eventId,
    //   rating: newFeedback.rating,
    //   tags: newFeedback.tags,
    //   comment: newFeedback.comment,
    // });

    // For demo, we’ll just append to local list
    setFeedbackList([newEntry, ...feedbackList]);

    // Reset form
    setNewFeedback({ eventId: "", rating: 0, comment: "", tags: [] });
    setSelectedEvent(null);
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
      <p className="feedback-subtitle">
        We value your thoughts. Share your feedback!
      </p>

      {/* ---------------------------------------------------------------- */}
      {/* HORIZONTAL SCROLL of Registered Events */}
      {/* ---------------------------------------------------------------- */}
      <div className="registered-events-scroll-container">
        <div className="registered-events-scroller">
          {registeredEvents.length === 0 ? (
            <p>No registered events found.</p>
          ) : (
            registeredEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => handleSelectEvent(evt)}
                className={`event-card ${
                  selectedEvent?.id === evt.id ? "selected" : ""
                }`}
              >
                <h3>{evt.title}</h3>
                <p>{evt.description}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* FEEDBACK FORM */}
      {/* ---------------------------------------------------------------- */}
      <form className="feedback-form" onSubmit={handleSubmit}>
        {/* Star Rating */}
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
                  setNewFeedback((prev) => ({ ...prev, rating: star }))
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

        {/* Comment Box */}
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

      {/* ---------------------------------------------------------------- */}
      {/* PREVIOUS FEEDBACK */}
      {/* ---------------------------------------------------------------- */}
      <h2 className="previous-feedback-title">Our Previous Feedbacks</h2>
      <div className="feedback-list">
        {feedbackList.length === 0 ? (
          <p className="no-feedback">No feedback submitted yet.</p>
        ) : (
          feedbackList.map((fb) => (
            <div className="feedback-card" key={fb.eventId}>
              <h3 className="feedback-event">{fb.eventName}</h3>
              <p className="feedback-rating">
                {"★".repeat(fb.rating)}
                {"☆".repeat(5 - fb.rating)}
              </p>
              <p className="feedback-comment">"{fb.comment}"</p>
              {fb.tags?.length > 0 && (
                <p className="feedback-tags">Tags: {fb.tags.join(", ")}</p>
              )}
              <p className="feedback-date">Submitted on: {fb.date}</p>
            </div>
          ))
        )}
        <div ref={feedbackEndRef} />
      </div>
    </div>
  );
};

export default FeedbackPage;
