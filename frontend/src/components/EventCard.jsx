import React from "react";
import "../styles/EventCard.css"; // Optional custom styling

const EventCard = ({ event, showActions = false, onEdit, onDelete }) => {
  return (
    <div className="event-card shadow-md bg-[#f9f9f9] rounded-xl p-6 transition hover:shadow-lg">
      <h2 className="text-xl font-semibold text-[#6d1a36]">{event.title}</h2>
      <p className="text-gray-600 mt-1">
        <strong>Date:</strong> {event.date}
      </p>
      <p className="text-gray-600">
        <strong>Location:</strong> {event.location}
      </p>
      <p className="text-gray-600">
        <strong>Status:</strong> {event.status}
      </p>

      {showActions && (
        <div className="mt-4 flex gap-3">
          <button
            onClick={onEdit}
            className="bg-[#53917e] text-white px-4 py-2 rounded-lg hover:bg-[#3e6e60]"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
