import React, { useState } from "react";
import "../styles/TicketingPage.css";

const TicketingPage = () => {
  const [attendeeType, setAttendeeType] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const pricing = {
    student: 10,
    nonStudent: 25,
    vip: 50,
    free: 0,
  };

  const events = [
    { id: 1, name: "AI in Education", priceTier: "student" },
    { id: 2, name: "Cybersecurity Workshop", priceTier: "nonStudent" },
    { id: 3, name: "Open Day - Free Access", priceTier: "free" },
  ];

  const handleRegister = () => {
    if (!attendeeType || !selectedEvent) {
      setConfirmation("Please select your attendee type and an event.");
      return;
    }

    const event = events.find((e) => e.id === parseInt(selectedEvent));
    const price = pricing[event.priceTier];

    // MOCK: Replace with API call to backend
    setConfirmation(
      `You successfully registered for "${event.name}" as a ${attendeeType}. ${
        price === 0
          ? "No payment is required."
          : `Total: $${price} – payment will be processed.`
      }`
    );
  };

  return (
    <div className="ticketing-page">
      <h2 className="page-title">Ticketing & Registration</h2>

      <div className="form-section">
        <label>Attendee Type:</label>
        <select value={attendeeType} onChange={(e) => setAttendeeType(e.target.value)}>
          <option value="">-- Select Type --</option>
          <option value="student">Student</option>
          <option value="nonStudent">Non-Student</option>
          <option value="vip">VIP</option>
        </select>

        <label>Choose an Event:</label>
        <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
          <option value="">-- Select Event --</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name} {pricing[event.priceTier] === 0 ? "(Free)" : `($${pricing[event.priceTier]})`}
            </option>
          ))}
        </select>

        <button onClick={handleRegister}>Register / Buy Ticket</button>

        {confirmation && <p className="confirmation">{confirmation}</p>}
      </div>
    </div>
  );
};

export default TicketingPage;
