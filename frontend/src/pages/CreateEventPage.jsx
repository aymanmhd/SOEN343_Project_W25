import React, { useState } from "react";
import "../styles/CreateEventPage.css";
import { useAuth } from "../context/AuthContext";
import { api_private_post } from "../utils/api.js";

const CreateEventPage = () => {
  const { user } = useAuth();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventPrice, setEventPrice] = useState(0);
  const [eventDescription, setEventDescription] = useState("");
  const [eventSpeakers, setEventSpeakers] = useState("");
  const [eventAttendees, setEventAttendees] = useState(""); // Added missing state
  const [submitStatus, setSubmitStatus] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitStatus(null);

    // Convert inputs safely
    const speakersArray = eventSpeakers
      ? eventSpeakers.split(",").map((s) => s.trim())
      : [];

    const attendeesArray = eventAttendees
      ? eventAttendees.split(",").map((s) => s.trim())
      : [];

    const priceValue = Number(eventPrice);

    api_private_post(
      "/events",
      {
        name: eventName,
        date: eventDate,
        location: eventLocation,
        price: priceValue,
        description: eventDescription,
        speakers: speakersArray,
        // attendees: attendeesArray // Only include if backend requires this
      },
      (response) => {
        if (response?.error) {
          setError(response.error);
        } else {
          setSubmitStatus("Event created successfully!");
          // Reset all form fields
          setEventName("");
          setEventDate("");
          setEventLocation("");
          setEventPrice(0);
          setEventDescription("");
          setEventSpeakers("");
          setEventAttendees("");
        }
      },
      (err) => {
        console.error("Event Creation failed:", err);
        setError("Event creation failed. Please try again.");
      }
    );
  };

  return (
    <div className="create-event-page px-4 sm:px-8 py-12 bg-white min-h-screen text-gray-800 animate-fadeIn">
      <h2 className="create-event-title">
        Create a New Event
      </h2>

      {submitStatus && (
        <div className="text-green-600 text-center mb-6 font-medium text-lg">
          {submitStatus}
        </div>
      )}

      {error && (
        <div className="text-red-600 text-center mb-6 font-medium text-lg">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-[#fefefe] shadow-xl rounded-2xl p-10 space-y-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Event Name */}
          <div>
            <label className="label-style">Event Name</label>
            <input
              type="text"
              required
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="input-style"
              placeholder="e.g. Women in Tech Panel"
            />
          </div>

          {/* Date */}
          <div>
            <label className="label-style">Date</label>
            <input
              type="date"
              required
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="input-style"
            />
          </div>

          {/* Location */}
          <div className="sm:col-span-2">
            <label className="label-style">Location</label>
            <input
              type="text"
              required
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              className="input-style"
              placeholder="e.g. Online or Concordia EV Building"
            />
          </div>

          {/* Price */}
          <div>
            <label className="label-style">Price ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              value={eventPrice}
              onChange={(e) => setEventPrice(Math.max(0, Number(e.target.value)))}
              className="input-style"
              placeholder="e.g. 10.00"
            />
          </div>

          {/* Speakers */}
          <div>
            <label className="label-style">Speakers (comma-separated)</label>
            <input
              type="text"
              value={eventSpeakers}
              onChange={(e) => setEventSpeakers(e.target.value)}
              className="input-style"
              placeholder="e.g. John Doe, Jane Smith"
            />
          </div>

          {/* Attendees - Only include if needed */}
          {/* <div>
            <label className="label-style">Attendees (comma-separated)</label>
            <input
              type="text"
              value={eventAttendees}
              onChange={(e) => setEventAttendees(e.target.value)}
              className="input-style"
              placeholder="e.g. email1@test.com, email2@test.com"
            />
          </div> */}

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="label-style">Description</label>
            <textarea
              rows="5"
              required
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="input-style resize-none"
              placeholder="Describe the event's purpose, audience, or goals..."
            />
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button type="submit" className="create-button">
            🚀 Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;