import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Import the login function from our mock AuthContext
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    try {
      // Attempt to log in with the provided email/password
      login(email, password);
      // If successful, send them to "/" which redirects based on role (see App.js)
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left-section">
        <h2 className="login-title">Login to Your Account</h2>

        <div className="login-social-icons">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="icon-circle"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noreferrer"
            className="icon-circle"
          >
            <i className="fab fa-google"></i>
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="icon-circle"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>

        <p className="login-or-text">or use your email:</p>

        {/* Actual login form */}
        <form onSubmit={handleSubmit} className="login-input-container">
          <div className="login-input-wrapper">
            <i className="fas fa-envelope input-icon"></i>
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-input-wrapper">
            <i className="fas fa-lock input-icon"></i>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="login-eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <p className="forgot-password">Forgot your password?</p>

          <button type="submit" className="btn-sign-in">
            SIGN IN
          </button>

          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        </form>
      </div>

      <div className="login-divider"></div>

      <div className="login-right-section">
        <h1 className="signup-title">New Here?</h1>
        <h2 className="signup-text">
          Sign up and discover a great amount of educational events!
        </h2>
        <button className="btn-sign-up" onClick={() => navigate("/signup")}>
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
