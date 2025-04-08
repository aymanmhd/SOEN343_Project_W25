import React, { useState } from "react";
import "../styles/CreateEventPage.css";
import { useAuth } from "../context/AuthContext";
import { api_private_post } from "../utils/api.js";

const CreateEventPage = () => {
  const { user } = useAuth();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState(""); 
  const [eventLocation, setEventLocation] = useState("");
  const [eventPrice, setEventPrice] = useState(0);
  const [eventDescription, setEventDescription] = useState("");
  const [eventSpeakers, setEventSpeakers] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventAgenda, setEventAgenda] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitStatus(null);

    const speakersArray = eventSpeakers
      ? eventSpeakers.split(",").map((s) => s.trim())
      : [];

    const priceValue = Number(eventPrice);

    console.log(
      "name: " + eventName,
      "date: " + eventDate,
      "time: "  + eventTime, 
      "location: " + eventLocation,
      "price: " + priceValue,
      "description: " + eventDescription,
      "speakers: " + speakersArray,
      "venue: "  + eventVenue,
    );

    api_private_post(
      "/events",
      {
        name: eventName,
        date: eventDate,
        time: eventTime, // ✅ NEW
        location: eventLocation,
        price: priceValue,
        description: eventDescription,
        speakers: speakersArray,
        venue: eventVenue,
      },
      (response) => {
        if (response?.error) {
          setError(response.error);
        } else {
          setSubmitStatus("Event created successfully!");
          setEventName("");
          setEventDate("");
          setEventTime(""); // ✅ NEW
          setEventLocation("");
          setEventPrice(0);
          setEventDescription("");
          setEventSpeakers("");
          setEventVenue("");
        }
      },
      (err) => {
        console.error("Event Creation failed:", err);
        setError("Event creation failed. Please try again.");
      }
    );
  };

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
              <label className="label-style">Venue</label>
              <input
                type="text"
                required
                value={eventVenue}
                onChange={(e) => setEventVenue(e.target.value)}
                className="input-style"
                placeholder="e.g. Convention Center Room 101"
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
            <label className="label-style">Detailed Agenda</label>
            <textarea
              rows="4"
              required
              value={eventAgenda}
              onChange={(e) => setEventAgenda(e.target.value)}
              className="input-style resize-none"
              placeholder="e.g.
                - 9:00 AM: Registration
                - 10:00 AM: Keynote Speech
                - 11:30 AM: Workshop Sessions"
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