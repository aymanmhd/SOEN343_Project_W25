import React, { useState } from "react";
import "../styles/ContactPage.css";
import { api_private_post } from "../utils/api.js";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    console.log("Form data:", form);    // Debugging line

    api_private_post(
      "/api/contact",
      form,
      (response) => {
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);
        setTimeout(() => setSubmitted(false), 5000);
      },
      (err) => {
        console.error("Contact submission failed:", err);
        setError("Failed to send message. Please try again.");
        setIsSubmitting(false);
      }
    );
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p className="subtitle">
          Have a question or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <button 
            type="submit" 
            className="btn-send"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {submitted && (
            <p className="success-message">
              ✅ Message submitted! We’ll get back to you soon.
            </p>
          )}
          
          {error && (
            <p className="error-message">
              ❌ {error}
            </p>
          )}
        </form>

        <div className="contact-info">
          <h3>Reach Us Directly</h3>
          <p><strong>Email:</strong> sees.team@university.ca</p>
          <p><strong>Team Lead:</strong> Arman Emami</p>
          <p><strong>Location:</strong> Montreal, QC, Canada</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;