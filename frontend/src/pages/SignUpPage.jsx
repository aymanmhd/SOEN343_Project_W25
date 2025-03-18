import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSignInHovered, setIsSignInHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Left Section (Sign Up) */}
      <div style={styles.leftSection}>
        <h2 style={styles.title}>Create an Account</h2>
        <div style={styles.socialIcons}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={styles.iconCircle}>
            <i className="fab fa-facebook-f" />
          </a>
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" style={styles.iconCircle}>
            <i className="fab fa-google" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.iconCircle}>
            <i className="fab fa-linkedin-in" />
          </a>
        </div>

        <p style={styles.orText}>or use your email:</p>

        <div style={styles.inputContainer}>
          <div style={styles.inputWrapper}>
            <i className="fas fa-user" style={styles.inputIcon}></i>
            <input type="text" placeholder="Name" style={styles.input} />
          </div>

          <div style={styles.inputWrapper}>
            <i className="fas fa-envelope" style={styles.inputIcon}></i>
            <input type="email" placeholder="Email" style={styles.input} />
          </div>

          <div style={styles.inputWrapper}>
            <i className="fas fa-lock" style={styles.inputIcon}></i>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={styles.input}
            />
            <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <p style={styles.forgotPassword}>Forgot your password?</p>

        {/* Sign Up Button */}
        <button
          style={{
            ...styles.signInButton,
            transform: isSignInHovered ? "scale(1.05)" : "scale(1)",
          }}
          onMouseEnter={() => setIsSignInHovered(true)}
          onMouseLeave={() => setIsSignInHovered(false)}
        >
          SIGN UP
        </button>
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Right Section */}
      <div style={styles.rightSection}>
        <h1 style={styles.signupTitle}>Welcome Back!</h1>
        <h2 style={styles.signupText}>Sign in and discover new educational events!</h2>

        {/* Navigate to LoginPage */}
        <button
          style={{
            ...styles.signUpButton,
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => navigate("/login")}
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    width: "100%",
    minHeight: "100vh",
    fontFamily: "sans-serif",
  },
  leftSection: {
    flex: 1,
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  rightSection: {
    flex: 1,
    padding: "2rem",
    backgroundColor: "#f7f7f7",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  divider: {
    width: "1px",
    backgroundColor: "#ccc",
  },
  title: {
    marginBottom: "1rem",
  },
  signupTitle: {
    fontSize: "24px",
    marginBottom: "1rem",
  },
  signupText: {
    fontSize: "16px",
    marginBottom: "1rem",
  },
  socialIcons: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  iconCircle: {
    borderRadius: "50%",
    border: "1px solid #ccc",
    padding: "0.5rem 0.6rem",
    textDecoration: "none",
    color: "#333",
  },
  orText: {
    margin: "1rem 0",
  },
  inputContainer: {
    marginBottom: "1rem",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "0 0.5rem",
  },
  inputIcon: {
    marginRight: "0.5rem",
    color: "#777",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "0.5rem 0",
  },
  eyeIcon: {
    cursor: "pointer",
  },
  forgotPassword: {
    marginTop: "0.5rem",
    cursor: "pointer",
    color: "#007bff",
  },
  signInButton: {
    marginTop: "1rem",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  signUpButton: {
    marginTop: "1rem",
    padding: "0.75rem 1.5rem",
    border: "1px solid #007bff",
    borderRadius: "4px",
    backgroundColor: "#fff",
    color: "#007bff",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
};

export default SignUpPage;
