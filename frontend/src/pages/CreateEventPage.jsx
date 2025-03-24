import React, { useState } from "react";
import "../styles/CreateEventPage.css";

const CreateEventPage = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: "", date: "", location: "" });

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = () => {
    // MOCK: Replace with backend POST
    const eventWithId = { ...newEvent, id: Date.now() };
    setEvents([...events, eventWithId]);
    setNewEvent({ name: "", date: "", location: "" });
  };

  const handleDeleteEvent = (id) => {
    // MOCK: Replace with backend DELETE
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleEditEvent = (id, field, value) => {
    // MOCK: Replace with backend PUT/PATCH
    setEvents(events.map((event) =>
      event.id === id ? { ...event, [field]: value } : event
    ));
  };

  return (
    <div className="event-management-container">
      <h2 className="page-title">Event Creation / Management Page</h2>

      {/* Event Creation Section */}
      <div className="create-section">
        <h3>Create New Event</h3>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newEvent.location}
          onChange={handleInputChange}
        />
        <button onClick={handleCreateEvent}>Create Event</button>
      </div>

      {/* Existing Events List */}
      <div className="event-list-section">
        <h3>Your Events</h3>
        {events.length === 0 ? (
          <p>No events yet.</p>
        ) : (
          <ul className="event-list">
            {events.map((event) => (
              <li key={event.id} className="event-item">
                <input
                  type="text"
                  value={event.name}
                  onChange={(e) =>
                    handleEditEvent(event.id, "name", e.target.value)
                  }
                />
                <input
                  type="date"
                  value={event.date}
                  onChange={(e) =>
                    handleEditEvent(event.id, "date", e.target.value)
                  }
                />
                <input
                  type="text"
                  value={event.location}
                  onChange={(e) =>
                    handleEditEvent(event.id, "location", e.target.value)
                  }
                />
                <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Placeholder Panels */}
      <div className="extras-section">
        <h3>Manage Attendees</h3>
        <p>// TODO: Integrate backend for attendee tracking</p>

        <h3>Resources</h3>
        <p>// TODO: Add file/resource manager</p>

        <h3>Finances</h3>
        <p>// TODO: Connect financial tracking dashboard</p>
      </div>
    </div>
  );
};

export default CreateEventPage;
