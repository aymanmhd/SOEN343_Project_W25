import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_private_post } from "../utils/api.js";
import "../styles/SignUpPage.css";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userRole, setUserRole] = useState("attendee"); // attendee or organizer
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    api_private_post(
      "/register", // BACKEND: Replace with your real registration endpoint
      { username, password, type: userRole, fullName },
      (response) => {
        if (response && response.error) {
          setError(response.error);
        } else {
          navigate("/login"); // Redirect after successful signup
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
      {/* Left Side */}
      <div className="signup-left-section">
        <h2 className="signup-title">Create an Account</h2>

        <div className="signup-social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="icon-circle">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.google.com" target="_blank" rel="noreferrer" className="icon-circle">
            <i className="fab fa-google"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="icon-circle">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>

        <p className="signup-or-text">or register with email:</p>

        <form onSubmit={handleSubmit} className="signup-input-container">
          {/* Full Name */}
          <div className="signup-input-wrapper">
            <i className="fas fa-user input-icon"></i>
            <input
              type="text"
              placeholder="Full Name"
              className="signup-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Username */}
          <div className="signup-input-wrapper">
            <i className="fas fa-envelope input-icon"></i>
            <input
              type="text"
              placeholder="Username"
              className="signup-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="signup-input-wrapper">
            <i className="fas fa-lock input-icon"></i>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="signup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="signup-eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <div className="signup-role-toggle-switch">
            <div className={`toggle-option ${userRole === "attendee" ? "active" : ""}`} onClick={() => setUserRole("attendee")}>
              Attendee
            </div>
            <div className={`toggle-option ${userRole === "organizer" ? "active" : ""}`} onClick={() => setUserRole("organizer")}>
              Organizer
            </div>
          </div>


          <button type="submit" className="btn-create-account">
            SIGN UP
          </button>

          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        </form>
      </div>

      {/* Divider */}
      <div className="signup-divider"></div>

      {/* Right Side */}
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
