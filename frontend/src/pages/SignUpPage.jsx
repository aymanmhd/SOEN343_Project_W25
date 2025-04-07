import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_private_post } from "../utils/api.js";
import "../styles/SignUpPage.css";
import SignUpFormBuilder from "../patterns/SignUpFormBuilder"; // adjust path as needed

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("attendee"); // New piece of state for role selection

  const navigate = useNavigate();

  // Use the builder for our form fields
  const formBuilder = new SignUpFormBuilder()
    .addInput("text", "Full Name", "fa-user", fullName, setFullName)
    .addInput("email", "Email", "fa-envelope", email, setEmail)
    .addPasswordInput(password, setPassword, showPassword, () =>
      setShowPassword(!showPassword)
    );

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Send the request to /auth/register with { name, email, password, role }
    api_private_post(
      "/auth/register",
      {
        name: fullName,
        email,
        password,
        role,
      },
      (response) => {
        if (response && response.error) {
          setError(response.error);
        } else {
          navigate("/login");
        }
      },
      (err) => {
        console.error("Signup failed:", err);
        setError("Registration failed. Please try again.");
      }
    );
  };

  return (
    <div className="signup-container">
      {/* LEFT SECTION */}
      <div className="signup-left-section">
        <h2 className="signup-title">Create an Account</h2>

        {/* Role Toggle Pills */}
        <div className="signup-role-toggle-switch">
          <div
            className={`toggle-option ${role === "attendee" ? "active" : ""}`}
            onClick={() => setRole("attendee")}
          >
            Attendee
          </div>
          <div
            className={`toggle-option ${role === "organizer" ? "active" : ""}`}
            onClick={() => setRole("organizer")}
          >
            Organizer
          </div>
        </div>

        <br />


        <form onSubmit={handleSubmit} className="signup-input-container">
          {formBuilder.build()}

          <button type="submit" className="btn-create-account">
            SIGN UP
          </button>

          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        </form>
      </div>

      {/* DIVIDER */}
      <div className="signup-divider"></div>

      {/* RIGHT SECTION */}
      <div className="signup-right-section">
        <h1 className="welcome-back-title">Welcome Back!</h1>
        <h2 className="welcome-back-text">
          Sign in and discover new educational events!
        </h2>
        <button className="btn-go-to-login" onClick={() => navigate("/login")}>
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
