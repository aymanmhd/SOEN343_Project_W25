import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api_private_get } from "../utils/api.js";
import "../styles/EventsPage.css"; // Create this CSS file

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    setLoading(true);
    setError("");
    
    api_private_get(
      "/events",
      (response) => {
        if (response?.error) {
          setError(response.error);
        } else {
          setEvents(response || []);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Failed to fetch events:", err);
        setError("Failed to load events. Please try again.");
        setLoading(false);
      }
    );
  };

  if (loading) {
    return <div className="loading-container">Loading events...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={fetchEvents} className="btn-retry">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="events-page-container">
      <h1 className="events-header">Upcoming Events</h1>
      
      <div className="events-grid">
        {events.length === 0 ? (
          <div className="no-events">No upcoming events found</div>
        ) : (
          events.map((event) => (
            <div key={event._id} className="event-card">
              <h2 className="event-title">{event.name}</h2>
              
              <div className="event-details">
                <p className="event-date">
                  📅 {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="event-location">📍 {event.location}</p>
                <p className="event-price">
                  💰 {event.price > 0 ? `$${event.price.toFixed(2)}` : "Free"}
                </p>
              </div>

              <p className="event-description">{event.description}</p>

              {event.speakers?.length > 0 && (
                <div className="event-speakers">
                  <h4>Speakers:</h4>
                  <p>{event.speakers.join(", ")}</p>
                </div>
              )}

              {event.attendees?.length > 0 && (
                <div className="event-attendees">
                  <h4>Attendees ({event.attendees.length}):</h4>
                  <p>{event.attendees.join(", ")}</p>
                </div>
              )}

              <button
                onClick={() => navigate(`/events/${event._id}`)}
                className="btn-view-details"
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsPage;