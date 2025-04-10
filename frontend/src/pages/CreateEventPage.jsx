import React, { useState } from "react";
import "../styles/CreateEventPage.css";
import { useAuth } from "../context/AuthContext";

const CreateEventPage = () => {
  const { user, createEvent } = useAuth();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventPrice, setEventPrice] = useState(0);
  const [eventDescription, setEventDescription] = useState("");
  const [eventSpeakers, setEventSpeakers] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitStatus(null);

    try {
      createEvent({
        name: eventName,
        date: eventDate,
        time: eventTime,
        location: eventLocation,
        price: Number(eventPrice),
        description: eventDescription,
        speakers: eventSpeakers
          ? eventSpeakers.split(",").map((s) => s.trim())
          : [],
      });

      setSubmitStatus("Event created successfully!");
      setEventName("");
      setEventDate("");
      setEventTime("");
      setEventLocation("");
      setEventPrice(0);
      setEventDescription("");
      setEventSpeakers("");
    } catch (err) {
      console.error("Event Creation failed:", err);
      setError("Event creation failed. Please try again.");
    }
  };

  // In a real app, you’d restrict this page to organizers only.
  // For the demo, it’s fine as is.
  
  return (
    <div className="create-event-page text-gray-800 animate-fadeIn">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-gradient">
        Create a New Event
      </h1>

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
        className="max-w-2xl w-full bg-[#fefefe] shadow-xl rounded-2xl p-10 space-y-8"
      >
        <div className="grid grid-cols-1 gap-6">
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

          <div className="grid sm:grid-cols-2 gap-6">
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

            <div>
              <label className="label-style">Time</label>
              <input
                type="time"
                required
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="input-style"
              />
            </div>
          </div>

          <div>
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

          <div>
            <label className="label-style">Price ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              value={eventPrice}
              onChange={(e) =>
                setEventPrice(Math.max(0, Number(e.target.value)))
              }
              className="input-style"
              placeholder="e.g. 10.00"
            />
          </div>

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

          <div>
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
