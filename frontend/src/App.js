import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar
import Footer from "./components/Footer"; // Import Footer
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardAttendees from "./pages/DashboardAttendees";
import DashboardOrganizers from "./pages/DashboardOrganizers";
import DashboardAdmin from "./pages/DashboardAdmin";
import CreateEventPage from "./pages/CreateEventPage";
import TicketingPage from "./pages/TicketingPage";

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
        <Route path="/dashboardAttendees" element={<DashboardAttendees />} />
        <Route path="/dashboardOrganizers" element={<DashboardOrganizers />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/createEvent" element={<CreateEventPage />} />
        <Route path="/ticketing" element={<TicketingPage />} />

      </Routes>

      {location.pathname === "/" && <Footer />} {/* Show Footer only on HomePage */}
    </div>
  );
}

export default App;
