import React, { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import EventCard from "../components/EventCard";
import "../styles/EventListingPage.css";

const EventListingPage = () => {
  // Pull the "events" array from our mock backend context
  const { events } = useAuth();

  // 9 fake events with a shortDescription
  const fakeEvents = useMemo(() => [
    {
      id: 101,
      title: "Intro to AI for Beginners",
      date: "2025-09-15",
      location: "Online",
      shortDescription: "AI Recommendation: Get started with the basics of Machine Learning and see how AI can power your projects!",
      imageUrl: "https://via.placeholder.com/300x180?text=Intro+to+AI",
    },
    {
      id: 102,
      title: "Cloud Deployment Masterclass",
      date: "2025-10-02",
      location: "Toronto",
      shortDescription: "AI Recommendation: Learn to build, deploy, and scale your apps in the cloud with zero downtime.",
      imageUrl: "https://via.placeholder.com/300x180?text=Cloud+Masterclass",
    },
    {
      id: 103,
      title: "React Native for Mobile Apps",
      date: "2025-08-21",
      location: "Montreal",
      shortDescription: "AI Recommendation: Hands-on workshop to create cross-platform mobile apps with React Native.",
      imageUrl: "https://via.placeholder.com/300x180?text=React+Native",
    },
    {
      id: 104,
      title: "UX/UI Design Principles",
      date: "2025-07-14",
      location: "Vancouver",
      shortDescription: "AI Recommendation: Boost user engagement by applying user-centric design patterns in your apps.",
      imageUrl: "https://via.placeholder.com/300x180?text=UX+UI+Design",
    },
    {
      id: 105,
      title: "Big Data & Hadoop Bootcamp",
      date: "2025-11-01",
      location: "Online",
      shortDescription: "AI Recommendation: Tackle large-scale data processing and analytics in a real-world environment.",
      imageUrl: "https://via.placeholder.com/300x180?text=Big+Data+Bootcamp",
    },
    {
      id: 106,
      title: "Cybersecurity Essentials",
      date: "2025-10-10",
      location: "New York City",
      shortDescription: "AI Recommendation: Keep your systems safe by understanding modern threats and prevention methods.",
      imageUrl: "https://via.placeholder.com/300x180?text=Cybersecurity",
    },
    {
      id: 107,
      title: "Data Science with Python",
      date: "2025-09-30",
      location: "San Francisco",
      shortDescription: "AI Recommendation: Dive into Python-based data analysis and visualization techniques.",
      imageUrl: "https://via.placeholder.com/300x180?text=Data+Science",
    },
    {
      id: 108,
      title: "DevOps Crash Course",
      date: "2025-12-05",
      location: "Online",
      shortDescription: "AI Recommendation: Learn CI/CD workflows, containerization, and best practices for modern DevOps.",
      imageUrl: "https://via.placeholder.com/300x180?text=DevOps",
    },
    {
      id: 109,
      title: "Blockchain & Web3 Summit",
      date: "2025-08-25",
      location: "Los Angeles",
      shortDescription: "AI Recommendation: Explore decentralized apps, smart contracts, and the future of the blockchain.",
      imageUrl: "https://via.placeholder.com/300x180?text=Blockchain",
    },
  ], []);

  // Combine them with user-created events
  // Note: The user-created events don’t have shortDescription or imageUrl by default,
  // so if you want, you can set some placeholder in EventCard for them.
  const combinedEvents = [...fakeEvents, ...events];

  return (
    <div className="event-listing-page">
      <div className="event-listing-header">
        <h1 className="event-listing-welcome">🌟 Hey there, future explorer!</h1>
        <p className="event-listing-sub">
          Discover exciting events below — find one that sparks your interest and click{" "}
          <strong>“View Details”</strong> to learn more! 💫
        </p>
      </div>

      <h2 className="event-listing-title">📅 Upcoming Events</h2>

      {combinedEvents.length === 0 ? (
        <p>No events found. (Ask an organizer to create an event!)</p>
      ) : (
        <div className="event-listing-grid">
          {combinedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventListingPage;
