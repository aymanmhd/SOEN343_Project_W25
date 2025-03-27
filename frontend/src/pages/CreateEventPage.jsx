import React, { useState } from "react";
import "../styles/CreateEventPage.css"; // Make sure this file exists
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

    // BACKEND: Replace this with API call to save the event
    console.log("Mock submit data:", formData);
    setSubmitStatus("✅ Event created successfully (mock)");
  };

  return (
    <div className="create-event-page px-8 py-12 bg-white min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Create a New Event
      </h1>

      {submitStatus && (
        <div className="text-green-600 text-center mb-4 font-medium">
          {submitStatus}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-[#f9f9f9] shadow-md rounded-xl p-8 space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="input-style"
              placeholder="e.g. AI in Education"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Category
            </label>
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
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Date
            </label>
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
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Time
            </label>
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
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="input-style"
              placeholder="e.g. Online or Room 101"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Capacity
            </label>
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
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              required
              value={formData.description}
              onChange={handleChange}
              className="input-style resize-none"
              placeholder="Describe your event..."
            />
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#b1b695] to-[#53917e] hover:scale-105 transition transform duration-300 text-white font-semibold py-3 px-6 rounded-full shadow-md"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
