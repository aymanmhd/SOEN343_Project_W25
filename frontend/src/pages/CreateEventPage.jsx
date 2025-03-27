import React, { useState } from "react";
import "../styles/CreateEventPage.css";
import { useAuth } from "../context/AuthContext";

const CreateEventPage = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    capacity: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // BACKEND: Replace with API call to create event
    console.log("Mock submit data:", formData);
    setSubmitStatus("🎉 Event created successfully (mock)");
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
          <div>
            <label className="label-style">Event Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="input-style"
              placeholder="e.g. Women in Tech Panel"
            />
          </div>

          <div>
            <label className="label-style">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-style"
            >
              <option value="">Select Category</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Webinar">Webinar</option>
              <option value="Networking">Networking</option>
            </select>
          </div>

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

          <div>
            <label className="label-style">Time</label>
            <input
              type="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="input-style"
            />
          </div>

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

          <div className="sm:col-span-2">
            <label className="label-style">Capacity</label>
            <input
              type="number"
              name="capacity"
              min="1"
              value={formData.capacity}
              onChange={handleChange}
              className="input-style"
              placeholder="e.g. 100"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="label-style">Description</label>
            <textarea
              name="description"
              rows="5"
              required
              value={formData.description}
              onChange={handleChange}
              className="input-style resize-none"
              placeholder="Describe the event purpose, audience, or goals..."
            />
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="create-button"
          >
            🚀 Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
