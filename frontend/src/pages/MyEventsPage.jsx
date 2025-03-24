import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard"; // Reusing existing EventCard
import "../styles/MyEventsPage.css";

const MyEventsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  // Restrict access to attendees only
  useEffect(() => {
    if (!user || user.role !== "attendee") {
      navigate("/");
    }
  }, [user, navigate]);

  // Simulate fetching the user's enrolled events
  useEffect(() => {
    // BACKEND: Replace these with actual API calls, e.g.:
    // fetch("/api/attendee/my-events")
    //   .then(res => res.json())
    //   .then(data => { 
    //       setUpcomingEvents(data.upcoming);
    //       setPastEvents(data.past);
    //   });

    // Mock data for demonstration
    const mockUpcoming = [
      {
        id: 101,
        title: "Intro to Machine Learning",
        date: "2025-09-10",
        location: "Online",
        shortDescription: "A beginner-friendly ML workshop.",
        imageUrl: "https://via.placeholder.com/300x180?text=MLWorkshop",
      },
      {
        id: 102,
        title: "Cybersecurity Basics",
        date: "2025-09-18",
        location: "Montreal, QC",
        shortDescription: "Learn fundamental cybersecurity practices.",
        imageUrl: "https://via.placeholder.com/300x180?text=CyberWorkshop",
      },
    ];

    const mockPast = [
      {
        id: 99,
        title: "Web Dev Bootcamp",
        date: "2025-08-01",
        location: "Toronto, ON",
        shortDescription: "Basics of frontend and backend development.",
        imageUrl: "https://via.placeholder.com/300x180?text=WebDevBootcamp",
      },
    ];

    setUpcomingEvents(mockUpcoming);
    setPastEvents(mockPast);
  }, []);

  return (
    <div className="my-events-page">
      <h2 className="my-events-title">My Events</h2>

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
