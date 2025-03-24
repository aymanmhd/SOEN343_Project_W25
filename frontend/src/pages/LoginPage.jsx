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




// Actual code to be used alongside with backend

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/LoginPage.css";

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <div className="login-container">
//       {/* Left Section */}
//       <div className="login-left-section">
//         <h2 className="login-title">Login to Your Account</h2>

//         <div className="login-social-icons">
//           <a
//             href="https://www.facebook.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="icon-circle"
//           >
//             <i className="fab fa-facebook-f"></i>
//           </a>
//           <a
//             href="https://www.google.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="icon-circle"
//           >
//             <i className="fab fa-google"></i>
//           </a>
//           <a
//             href="https://www.linkedin.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="icon-circle"
//           >
//             <i className="fab fa-linkedin-in"></i>
//           </a>
//         </div>

//         <p className="login-or-text">or use your email:</p>

//         <div className="login-input-container">
//           <div className="login-input-wrapper">
//             <i className="fas fa-envelope input-icon"></i>
//             <input type="email" placeholder="Email" className="login-input" />
//           </div>
//           <div className="login-input-wrapper">
//             <i className="fas fa-lock input-icon"></i>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className="login-input"
//             />
//             <span
//               className="login-eye-icon"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "🙈" : "👁️"}
//             </span>
//           </div>
//         </div>

//         <p className="forgot-password">Forgot your password?</p>

//         <button className="btn-sign-in">SIGN IN</button>
//       </div>

//       <div className="login-divider"></div>

//       {/* Right Section */}
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

