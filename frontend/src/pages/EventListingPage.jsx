import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import "../styles/EventListingPage.css";

const EventListingPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // BACKEND: Replace with actual API call to fetch events
    const mockEvents = [
      {
        id: 1,
        title: "React Basics Workshop",
        date: "2025-06-10",
        location: "Online",
        shortDescription: "Learn the foundations of React.",
        imageUrl: "https://via.placeholder.com/300x180?text=ReactWorkshop",
      },
      {
        id: 2,
        title: "Advanced Node.js Conference",
        date: "2025-06-15",
        location: "New York City",
        shortDescription: "Deep dive into Node.js architecture.",
        imageUrl: "https://via.placeholder.com/300x180?text=NodeConference",
      },
      {
        id: 3,
        title: "UI/UX Design Bootcamp",
        date: "2025-07-01",
        location: "San Francisco",
        shortDescription: "Hands-on training for UI/UX design patterns.",
        imageUrl: "https://via.placeholder.com/300x180?text=UIUXBootcamp",
      },
      {
        id: 4,
        title: "Cloud Computing Summit",
        date: "2025-07-21",
        location: "Toronto",
        shortDescription: "Latest trends in cloud technologies.",
        imageUrl: "https://via.placeholder.com/300x180?text=CloudSummit",
      },
    ];

    setEvents(mockEvents);
  }, []);

  return (
    <div className="event-listing-page">
      <div className="event-listing-header">
        <h1 className="event-listing-welcome">🌟 Hey there, future explorer!</h1>
        <p className="event-listing-sub">
          Discover exciting events below — find one that sparks your interest and click <strong>“View Details”</strong> to learn more! 💫
        </p>
      </div>

      <h2 className="event-listing-title">📅 Upcoming Events</h2>

      <div className="event-listing-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventListingPage;
