import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_private_post } from "../utils/api.js";
import "../styles/SignUpPage.css";
import SignUpFormBuilder from "../patterns/SignUpFormBuilder"; // adjust path as needed

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🧱 Use the builder here:
  const formBuilder = new SignUpFormBuilder()
    .addInput("text", "Full Name", "fa-user", fullName, setFullName)
    .addInput("text", "Username", "fa-envelope", username, setUsername)
    .addPasswordInput(password, setPassword, showPassword, () =>
      setShowPassword(!showPassword)
    );

  // 🧠 Function to handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    api_private_post(
      "/register",
      { username, password, fullName, type: "Regular" },
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
      <div className="signup-left-section">
        <h2 className="signup-title">Create an Account</h2>

       

        <p className="signup-or-text">or register with email:</p>

        <form onSubmit={handleSubmit} className="signup-input-container">
          {formBuilder.build()}

          <button type="submit" className="btn-create-account">
            SIGN UP
          </button>

          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        </form>
      </div>

      <div className="signup-divider"></div>

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
