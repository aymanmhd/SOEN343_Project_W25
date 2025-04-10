import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/EventDetailsPage.css";
import { useAuth } from "../context/AuthContext";

const EventDetailsPage = () => {
  const { id } = useParams(); // get eventId from URL
  const { user, events, registerForEvent } = useAuth();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // For demonstration, we’ll find the event in our context by ID
    const numericId = Number(id);
    const found = events.find((evt) => evt.id === numericId);
    if (found) {
      setEvent(found);
    } else {
      // If not found, set a mock or do something else
      setEvent({
        id: numericId,
        title: "Mock Event Title",
        date: "2025-08-01",
        location: "Virtual",
        description:
          "This is a placeholder event because we couldn't find the ID in local storage.",
        imageUrl: "https://via.placeholder.com/800x400?text=Event+Banner",
      });
    }
  }, [id, events]);

  if (!event) {
    return (
      <div className="event-details-page">
        <h2>Loading event details...</h2>
      </div>
    );
  }

  const handleRegister = () => {
    if (!user) {
      alert("Please log in first!");
      return;
    }
    if (user.role !== "attendee") {
      alert("Only attendees can register for events in this demo!");
      return;
    }
    registerForEvent(event.id);
    alert("Registered successfully (mock)!");
  };

  return (
    <div className="event-details-page">
      <div className="event-banner">
        {event.imageUrl && <img src={event.imageUrl} alt={event.title} />}
      </div>

      <div className="event-content">
        <h2 className="event-title">{event.title}</h2>
        <p className="event-meta">
          <strong>Date:</strong> {event.date} |{" "}
          <strong>Location:</strong> {event.location}
        </p>
        <p className="event-description">{event.description}</p>

        {/* Registration button */}
        <button className="btn-register" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default EventDetailsPage;
