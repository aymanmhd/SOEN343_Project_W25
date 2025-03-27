import React, { useState } from "react";
import "../styles/CreateEventPage.css"; // Adjust path if needed
import { useAuth } from "../context/AuthContext"; // If you need user role checks

const CreateEventPage = () => {
  const { user } = useAuth(); // Remove if not using AuthContext

  // These fields match your event schema: name, date, location, price, description, speakers, attendees.
  // "speakers" is input as comma-separated text (later converted into an array).
  // "attendees" typically starts empty (the backend can handle adding attendees).
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    price: "",
    description: "",
    speakers: ""
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    // Convert the comma-separated "speakers" string into an array
    const speakersArray = formData.speakers
      ? formData.speakers.split(",").map((s) => s.trim())
      : [];

    // Build the event object
    const newEvent = {
      name: formData.name,
      date: formData.date,        // Example: "2025-03-26T23:16:22.376Z" or "2025-04-10"
      location: formData.location,
      price: Number(formData.price),  // Convert string to number
      description: formData.description,
      speakers: speakersArray,        // e.g. ["Speaker A", "Speaker B"]
      attendees: []                   // Typically empty at creation
    };

    // BACKEND: Replace this mock console.log with a real API call (fetch, axios, etc.)
    console.log("Mock event creation:", newEvent);

    // Example fetch call (uncomment & adjust if you want to test):
    /*
    try {
      const response = await fetch("/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent)
      });
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      const createdEvent = await response.json();
      setSubmitStatus(`🎉 Event '${createdEvent.name}' created successfully!`);
    } catch (err) {
      console.error(err);
      setSubmitStatus("Error creating event.");
    }
    */

    // For now, we simulate success:
    setSubmitStatus("🎉 Event created successfully (mock)!");
  };

  return (
    <div className="create-event-page px-4 sm:px-8 py-12 bg-white min-h-screen text-gray-800 animate-fadeIn">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-center text-gradient">
        Create a New Event
      </h1>

      {submitStatus && (
        <div className="text-green-600 text-center mb-6 font-medium text-lg">
          {submitStatus}
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
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="input-style"
              placeholder="e.g. Women in Tech Panel"
            />
          </div>

          {/* Date (ISO or YYYY-MM-DD) */}
          <div>
            <label className="label-style">Date</label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="input-style"
            />
          </div>

          {/* Location */}
          <div className="sm:col-span-2">
            <label className="label-style">Location</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="input-style"
              placeholder="e.g. Online or Concordia EV Building"
            />
          </div>

          {/* Price */}
          <div>
            <label className="label-style">Price</label>
            <input
              type="number"
              name="price"
              min="0"
              required
              value={formData.price}
              onChange={handleChange}
              className="input-style"
              placeholder="e.g. 10"
            />
          </div>

          {/* Speakers (Comma-separated) */}
          <div>
            <label className="label-style">Speakers (comma-separated)</label>
            <input
              type="text"
              name="speakers"
              value={formData.speakers}
              onChange={handleChange}
              className="input-style"
              placeholder="e.g. John Doe, Jane Smith"
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="label-style">Description</label>
            <textarea
              name="description"
              rows="5"
              required
              value={formData.description}
              onChange={handleChange}
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
