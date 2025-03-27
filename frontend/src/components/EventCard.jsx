import React from "react";
import { Link } from "react-router-dom";
import "../styles/EventCard.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      {/* Thumbnail or Banner */}
      <div className="event-card-image">
        <img
          src={event.imageUrl || "https://via.placeholder.com/300x180"}
          alt={event.title}
        />
      </div>

      {/* Body */}
      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-description">
          {event.shortDescription || "No description provided."}
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
