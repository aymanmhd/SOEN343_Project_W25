import React from "react";
import "../styles/EventCardManage.css";

const EventCardManage = ({ event, onEdit, onDelete }) => {
  return (
    <div className="event-card">
      <div className="event-card-image">
        <img src={event.image} alt={event.title} />
      </div>

      <div className="event-card-body">
        <div className="event-card-title">{event.title}</div>
        <div className="event-card-description">{event.description}</div>
        <div className="event-card-info">
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Location:</strong> {event.location}</p>
        </div>
      </div>

      <div className="event-card-footer">
        <button className="btn-edit" onClick={onEdit}>Edit</button>
        <button className="btn-delete" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default EventCardManage;
