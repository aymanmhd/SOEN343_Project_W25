import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpPage.css";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      {/* Left Section (Sign Up) */}
      <div className="signup-left-section">
        <h2 className="signup-title">Create an Account</h2>
        <div className="signup-social-icons">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-circle"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-circle"
          >
            <i className="fab fa-google"></i>
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-circle"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <p className="signup-or-text">or use your email:</p>

        <div className="signup-input-container">
          <div className="signup-input-wrapper">
            <i className="fas fa-user input-icon"></i>
            <input type="text" placeholder="Name" className="signup-input" />
            <i className="fas fa-envelope input-icon"></i>
            <input type="email" placeholder="Email" className="signup-input" />
          </div>

          <div className="signup-input-wrapper">
            <i className="fas fa-lock input-icon"></i>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="signup-input"
            />
            <span
              className="signup-eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>
        <p className="forgot-password">Forgot your password?</p>

        <button className="btn-create-account">SIGN UP</button>
      </div>

      <div className="signup-divider"></div>

      {/* Right Section (Sign In) */}
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
