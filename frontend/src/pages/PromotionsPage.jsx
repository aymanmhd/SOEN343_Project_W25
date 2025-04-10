import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/PromotionsPage.css";

const PromotionsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Restrict to organizers only
  useEffect(() => {
    if (!user || user.role !== "organizer") {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // BACKEND: Replace this with API call to send email to all attendees
    // Example: await fetch("/api/send-promo", { method: "POST", body: JSON.stringify({ subject, message }) });

    console.log("Sending promotional email:");
    console.log("Subject:", subject);
    console.log("Message:", message);

    setSubmitted(true);
    setSubject("");
    setMessage("");
  };

  return (
    <div className="promotions-page">
      <h2 className="promotions-title">Send Promotional Email to Attendees</h2>

      <form className="promotions-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <textarea
          placeholder="Write your promotional message here..."
          rows="8"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <button type="submit" className="btn-send-promo">Send Email</button>

        {submitted && (
          <p className="success-message">
            ✅ Email successfully sent to all attendees!
          </p>
        )}
      </form>
    </div>
  );
};

export default PromotionsPage;
