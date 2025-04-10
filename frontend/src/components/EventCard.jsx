import React from "react";
import { Link } from "react-router-dom";
import "../styles/EventCard.css";

// Array of fallback image URLs
const fallbackImages = [
  "https://source.unsplash.com/300x180/?tech",
  "https://source.unsplash.com/300x180/?conference",
  "https://source.unsplash.com/300x180/?education",
  "https://source.unsplash.com/300x180/?startup",
  "https://source.unsplash.com/300x180/?coding",
  "https://source.unsplash.com/300x180/?innovation",
  "https://source.unsplash.com/300x180/?developer",
  "https://source.unsplash.com/300x180/?seminar",
  "https://source.unsplash.com/300x180/?networking",
];

// Picks a fallback image based on the event ID (so every event looks different)
const getFallbackImage = (eventId) => {
  // Safely convert to a number and pick an index
  const index = Number(eventId) % fallbackImages.length;
  return fallbackImages[index];
};

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      {/* Thumbnail or Banner */}
      <div className="event-card-image">
        <img
          src={event.imageUrl || getFallbackImage(event.id)}
          alt={event.title}
          className="event-image" // Make sure to define .event-image in EventCard.css
        />
      </div>

      {/* Body */}
      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-description">
          {event.shortDescription || (
            <>
              <strong>AI Recommendation:</strong> This is an exciting opportunity to learn, network, and grow.
            </>
          )}
        </p>

        <div className="event-card-info">
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Location:</strong> {event.location}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="event-card-footer">
        <Link to={`/events/${event.id}`} className="btn-event-details">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
