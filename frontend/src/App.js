import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar
import Footer from "./components/Footer"; // Import Footer
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation(); // Get the current path

  return (
    <div className="app-container">
      {location.pathname === "/" && <Navbar />} {/* Show Navbar only on HomePage */}

      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home Page */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>

      {location.pathname === "/" && <Footer />} {/* Show Footer only on HomePage */}
    </div>
  );
}

export default App;
