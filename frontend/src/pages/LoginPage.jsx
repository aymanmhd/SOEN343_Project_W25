// The below code is to test until the backend is ready for user authentication
import { useAuth } from "../context/AuthContext";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const { login } = useAuth();

  return (
    <div className="login-page">
      <h1 style={{ color: "red" }}> This is for testing purposes only (until backend works)</h1>
      <h2>Select a Role to Login as:</h2>
      <button onClick={() => login("attendee")}>Login as Attendee</button>
      <button onClick={() => login("organizer")}>Login as Organizer</button>
      <button onClick={() => login("admin")}>Login as Admin</button>
    </div>
  );
};

export default LoginPage;



  // import React, { useState } from "react";
  // import { useNavigate } from "react-router-dom";
  // import { api_private_post } from "../utils/api.js";
  // import "../styles/LoginPage.css";

  // const LoginPage = () => {
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [showPassword, setShowPassword] = useState(false);
  //   const [error, setError] = useState("");
  //   const navigate = useNavigate();

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setError("");

  //     api_private_post(
  //       "/login",
  //       { username, password },
  //       (response) => {
  //         if (response && response.error) {
  //           setError(response.error);
  //         } else {
  //           navigate("/account");
  //         }
  //       },
  //       (err) => {
  //         console.error("Login failed:", err);
  //         setError("Login failed. Please check your username and password.");
  //       }
  //     );
  //   };

  //   return (
  //     <div className="login-container">
  //       <div className="login-left-section">
  //         <h2 className="login-title">Login to Your Account</h2>

  //         <div className="login-social-icons">
  //           <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="icon-circle">
  //             <i className="fab fa-facebook-f"></i>
  //           </a>
  //           <a href="https://www.google.com" target="_blank" rel="noreferrer" className="icon-circle">
  //             <i className="fab fa-google"></i>
  //           </a>
  //           <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="icon-circle">
  //             <i className="fab fa-linkedin-in"></i>
  //           </a>
  //         </div>

  //         <p className="login-or-text">or use your username:</p>

  //         {/* <form onSubmit={handleSubmit} className="login-input-container" action="http://localhost:8888/login" method="POST"> */}
  //         <form className="login-input-container" action="http://localhost:8888/login" method="POST">
  //           <div className="login-input-wrapper">
  //             <i className="fas fa-envelope input-icon"></i>
  //             <input
  //               type="text"
  //               placeholder="Username"
  //               name="username"
  //               className="login-input"
  //               value={username}
  //               onChange={(e) => setUsername(e.target.value)}
  //               required
  //             />
  //           </div>
  //           <div className="login-input-wrapper">
  //             <i className="fas fa-lock input-icon"></i>
  //             <input
  //               type={showPassword ? "text" : "password"}
  //               placeholder="Password"
  //               name="password"
  //               className="login-input"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //               required
  //             />
  //             <span
  //               className="login-eye-icon"
  //               onClick={() => setShowPassword(!showPassword)}
  //             >
  //               {showPassword ? "🙈" : "👁️"}
  //             </span>
  //           </div>

  //           <p className="forgot-password">Forgot your password?</p>

  //           <button type="submit" className="btn-sign-in">
  //             SIGN IN
  //           </button>

  //           {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
  //         </form>
  //       </div>

  //       <div className="login-divider"></div>

  //       <div className="login-right-section">
  //         <h1 className="signup-title">New Here?</h1>
  //         <h2 className="signup-text">
  //           Sign up and discover a great amount of educational events!
  //         </h2>
  //         <button className="btn-sign-up" onClick={() => navigate("/signup")}>
  //           SIGN UP
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  // export default LoginPage;