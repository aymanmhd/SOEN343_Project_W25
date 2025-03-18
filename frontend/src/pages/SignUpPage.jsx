import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  // Controls hover animation for SIGN UP button
  const [isHovered, setIsHovered] = useState(false);
  // Controls hover animation for SIGN IN button
  const [isSignInHovered, setIsSignInHovered] = useState(false);

  // Add navigate for routing
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Left Section (Sign Up) */}
      <div style={styles.leftSection}>
        <h2 style={styles.title}>Create an Account</h2>
        <div style={styles.socialIcons}>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.iconCircle}
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.iconCircle}
          >
            <i className="fab fa-google"></i>
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.iconCircle}
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <p style={styles.orText}>or use your email:</p>

        <div style={styles.inputContainer}>
          {/* Name + Email in the same wrapper (as in F version) */}
          <div style={styles.inputWrapper}>
            <i className="fas fa-user" style={styles.inputIcon}></i>
            <input type="name" placeholder="Name" style={styles.input} />
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
            <span
              style={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
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

      <div style={styles.divider}></div>

      {/* Right Section (Sign In) */}
      <div style={styles.rightSection}>
        <h1 style={styles.signupTitle}>Welcome Back!</h1>
        <h2 style={styles.signupText}>
          Sign in and discover new educational events!
        </h2>
        <button
          style={{
            ...styles.signUpButton,
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          // Navigate back to LoginPage
          onClick={() => navigate("/login")}
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
};

// Keyframes for fade in
const fadeInKeyframes = {
  from: { opacity: 0 },
  to: { opacity: 1 },
};

// Styles from the F version
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    background: "#FFFFFF",
    fontFamily: "'Poppins', sans-serif",
  },
  leftSection: {
    flex: 1,
    padding: "40px",
    textAlign: "center",
    background: "linear-gradient(135deg, #B1B695, #53917E)",
    color: "white",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // Fade-in animation:
    animationName: fadeInKeyframes,
    animationDuration: "1.5s",
    animationFillMode: "forwards",
  },
  rightSection: {
    flex: 1,
    padding: "40px",
    textAlign: "center",
    background: "white",
    color: "white",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // Fade-in animation:
    animationName: fadeInKeyframes,
    animationDuration: "1.5s",
    animationFillMode: "forwards",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "white",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "15px",
  },
  iconCircle: {
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: "#f1f1f1",
    color: "#000",
    fontSize: "22px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background 0.3s ease-in-out",
  },
  orText: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    background: "#f9f9f9",
    borderRadius: "8px",
    padding: "10px",
    width: "300px",
    border: "1px solid #ddd",
    position: "relative",
    // The old code lumps Name + Email in the same line
    // but we keep the same styling here
  },
  inputIcon: {
    color: "#999",
    marginRight: "10px",
  },
  input: {
    width: "100%",
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: "14px",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    fontSize: "18px",
  },
  forgotPassword: {
    fontSize: "14px",
    color: "#6D1A36",
    cursor: "pointer",
    marginTop: "10px",
    textDecoration: "underline",
  },
  signInButton: {
    width: "300px",
    padding: "12px",
    marginTop: "15px",
    background: "white",
    color: "#53917E",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "transform 0.3s ease-in-out, background 0.3s ease-in-out",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  signUpButton: {
    width: "300px",
    padding: "12px",
    marginTop: "15px",
    background: "linear-gradient(135deg, #B1B695, #53917E)",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "transform 0.3s ease-in-out, background 0.3s ease-in-out",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  divider: {
    width: "2px",
    background: "#B1B695",
    height: "100vh",
  },
  signupTitle: {
    fontSize: "28px",
    color: "#53917E",
    marginBottom: "10px",
  },
  signupText: {
    fontSize: "18px",
    margin: "0 30px",
    color: "#53917E",
  },
};

export default SignUpPage;
