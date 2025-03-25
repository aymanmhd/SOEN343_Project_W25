import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpPage.css";
import SignUpFormBuilder from "../patterns/SignUpFormBuilder"; // Import Builder

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  // Use the Builder Pattern to construct the form
  const formBuilder = new SignUpFormBuilder();
  const formElements = formBuilder
    .addSocialIcons()
    .addInput("text", "Name", "fa-user", name, setName)
    .addInput("email", "Email", "fa-envelope", email, setEmail)
    .addPasswordInput(showPassword, () => setShowPassword(!showPassword))
    .build();

  return (
    <div className="signup-container">
      {/* Left Section (Sign Up) */}
      <div className="signup-left-section">
        <h2 className="signup-title">Create an Account</h2>
        {formElements}
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
