import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import "../styles/ManageEventsPage.css"; // Optional if you want specific styling

const mockEvents = [
  {
    id: 1,
    title: "AI in Education",
    date: "2025-04-12",
    location: "Virtual",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Career Fair 2025",
    date: "2025-03-15",
    location: "Downtown Hall",
    status: "Completed",
  },
  {
    id: 3,
    title: "Hackathon for Learning",
    date: "2025-05-20",
    location: "Tech Center",
    status: "Draft",
  },
];

const ManageEventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // BACKEND: Replace with API call to fetch events created by this organizer
    // Example: fetch("/api/events/organizer").then(res => res.json()).then(setEvents)
    setEvents(mockEvents);
  }, []);

  const handleEdit = (eventId) => {
    // BACKEND: Navigate to edit form (pre-fill with event details)
    console.log("Editing event:", eventId);
  };

  const handleDelete = (eventId) => {
    // BACKEND: Call API to delete event
    console.log("Deleting event:", eventId);
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  return (
    <div className="manage-events-page p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-[#53917e] mb-6">Manage Your Events</h1>

      {events.length === 0 ? (
        <p className="text-gray-600">No events created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              showActions={true}
              onEdit={() => handleEdit(event.id)}
              onDelete={() => handleDelete(event.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageEventsPage;
