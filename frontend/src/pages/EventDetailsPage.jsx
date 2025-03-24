import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/EventDetailsPage.css";

const EventDetailsPage = () => {
  const { id } = useParams(); // get eventId from URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // BACKEND: Replace with actual API call, e.g.:
    // fetch(`/api/events/${id}`)
    //   .then(res => res.json())
    //   .then(data => setEvent(data));

    // For demonstration, let's use a mock:
    const mockEvent = {
      id,
      title: "Mock Event Title",
      date: "2025-08-01",
      location: "Virtual",
      description:
        "This is a longer description of the event. Here you'll find more details about what the event is about, the schedule, and any other relevant information for attendees.",
      imageUrl: "https://via.placeholder.com/800x400?text=Event+Banner",
    };

    setEvent(mockEvent);
  }, [id]);

  if (!event) {
    return (
      <div className="event-details-page">
        <h2>Loading event details...</h2>
      </div>
    );
  }

  return (
    <div className="event-details-page">
      <div className="event-banner">
        <img src={event.imageUrl} alt={event.title} />
      </div>

      <div className="event-content">
        <h2 className="event-title">{event.title}</h2>
        <p className="event-meta">
          <strong>Date:</strong> {event.date} | <strong>Location:</strong> {event.location}
        </p>
        <p className="event-description">{event.description}</p>

        {/* You can add more sections: e.g. Agenda, Speakers, Registration button, etc. */}
        <button className="btn-register" onClick={() => alert("Register clicked (placeholder)")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default EventDetailsPage;
