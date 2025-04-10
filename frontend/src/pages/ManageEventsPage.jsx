import React, { useState, useEffect } from "react";
import EventCardManage from "../components/EventCardManage";
import "../styles/ManageEventsPage.css";
import { useAuth } from "../context/AuthContext";

const ManageEventsPage = () => {
  const { user, events, deleteEvent } = useAuth(); // note the new deleteEvent
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeAgenda, setActiveAgenda] = useState(null);
  const [activeVenue, setActiveVenue] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "organizer") {
      // If desired, redirect if not an organizer
    }
    // Show only events created by this organizer
    const myEvents = events.filter((evt) => evt.organizerId === user?.id);
    setFilteredEvents(myEvents);
  }, [user, events]);

  const handleEdit = (eventId) => {
    console.log("Editing event:", eventId);
    alert("Edit event is just a placeholder in this mock.");
  };

  // Call our new deleteEvent from context
  const handleDelete = (eventId) => {
    // Remove from the global store
    deleteEvent(eventId);

    // Also remove from local state to update UI
    setFilteredEvents((prev) => prev.filter((evt) => evt.id !== eventId));
  };

  const handleAgendaClick = (event) => {
    setActiveAgenda(event);
  };

  const handleVenueBooking = (event) => {
    setActiveVenue(event);
  };

  const handleCalendarSync = (event) => {
    const calendarContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SEES Smart Education Event System//EN
BEGIN:VEVENT
UID:${event.id}@sees.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
DTSTART:${event.date.replace(/-/g, "")}T120000Z
DTEND:${event.date.replace(/-/g, "")}T140000Z
LOCATION:${event.location}
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Reminder for ${event.title}
END:VALARM
END:VEVENT
END:VCALENDAR
`.trim();

    const blob = new Blob([calendarContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const fileName = `${event.title.replace(/\s+/g, "_")}.ics`;

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // For the demo, treat them all as "upcoming"
  const upcomingEvents = filteredEvents;
  const pastEvents = []; // or filter if you want

  return (
    <div className="manage-events-page">
      <section className="event-section">
        <h2 className="section-title">Upcoming Events</h2>
        <div className="event-grid">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="event-wrapper">
              <EventCardManage
                event={event}
                onEdit={() => handleEdit(event.id)}
                onDelete={() => handleDelete(event.id)}
              />
              <div className="event-tools">
                <button className="btn-secondary" onClick={() => handleAgendaClick(event)}>
                  🗓 Edit Agenda
                </button>
                <button className="btn-secondary" onClick={() => handleVenueBooking(event)}>
                  🏢 Venue Booking
                </button>
                <button className="btn-secondary" onClick={() => handleCalendarSync(event)}>
                  📆 Sync Calendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="event-section">
        <h2 className="section-title">Past Events</h2>
        <div className="event-grid">
          {pastEvents.length === 0 ? (
            <p>No past events found.</p>
          ) : (
            pastEvents.map((event) => (
              <EventCardManage
                key={event.id}
                event={event}
                onEdit={() => handleEdit(event.id)}
                onDelete={() => handleDelete(event.id)}
              />
            ))
          )}
        </div>
      </section>

      {/* Agenda Modal */}
      {activeAgenda && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>🗓 Agenda for {activeAgenda.title}</h3>
            <textarea
              className="agenda-textarea"
              placeholder="Write event agenda here..."
              defaultValue={"- Welcome\n- Keynote Speaker\n- Networking Session"}
            />
            <button className="btn-secondary" onClick={() => setActiveAgenda(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Venue Modal */}
      {activeVenue && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>🏢 Venue Booking for {activeVenue.title}</h3>
            <input className="input-style" placeholder="Enter venue (room, link, location)..." />
            <button className="btn-secondary" onClick={() => setActiveVenue(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEventsPage;
