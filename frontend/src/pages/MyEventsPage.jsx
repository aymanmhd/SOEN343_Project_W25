import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard"; // Reuse your existing component
import "../styles/MyEventsPage.css";

const MyEventsPage = () => {
  const { user, events } = useAuth();
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "attendee") {
      // ideally redirect or block
      // For demo, let's just console.warn or redirect:
      // navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.role === "attendee") {
      // user.registeredEvents is an array of IDs
      const userEventIds = user.registeredEvents || [];

      // filter the global events to only those whose IDs are in registeredEvents
      const userEvents = events.filter((evt) =>
        userEventIds.includes(evt.id)
      );

      // separate them into upcoming vs past if you like; for now, treat all as upcoming
      setUpcomingEvents(userEvents);
      setPastEvents([]); // or filter by date if you want
    }
  }, [user, events]);

  return (
    <div className="my-events-header">
      <h2 className="my-events-title">📖 My Events</h2>
      <p className="my-events-subtext">
        👋 Hey there! These are the events you've registered for.  
        Stay curious, stay prepared, and make the most of every moment! ✨
      </p>

      {/* Upcoming Events */}
      <section className="my-events-section">
        <h3>Upcoming Events</h3>
        {upcomingEvents.length === 0 ? (
          <p>No upcoming events found.</p>
        ) : (
          <div className="my-events-grid">
            {upcomingEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        )}
      </section>

      {/* Past Events */}
      <section className="my-events-section">
        <h3>Past Events</h3>
        {pastEvents.length === 0 ? (
          <p>No past events found.</p>
        ) : (
          <div className="my-events-grid">
            {pastEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyEventsPage;
