import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import AuthProvider
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AttendeeDashboard from "./pages/AttendeeDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import AdminPanel from "./pages/AdminPanel";
import ProfilePage from "./pages/ProfilePage"; 
import NetworkingPage from "./pages/NetworkingPage";
import EventListingPage from "./pages/EventListingPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

// Redirect users based on role when they visit "/"
function HomeRedirector() {
  const { user } = useAuth();
  
  if (!user) return <HomePage />; // Public homepage if not logged in
  if (user.role === "attendee") return <AttendeeDashboard />;
  if (user.role === "organizer") return <OrganizerDashboard />;
  if (user.role === "admin") return <AdminPanel />;
}

function AppContent() {
  const location = useLocation(); // Get the current path

  return (
    <div className="app-container">
      <Navbar /> {/* Navbar stays fixed at the top */}

      <main> {/* Added padding here to prevent navbar overlap */}
        <Routes>
          <Route path="/" element={<HomeRedirector />} /> {/* Home changes based on role */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/attendee-dashboard" element={<AttendeeDashboard />} />
          <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminPanel />} />
          <Route path="/networking" element={<NetworkingPage />} />
          <Route path="/events" element={<EventListingPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </main>

      {location.pathname === "/" && <Footer />} {/* Show Footer only on public homepage */}
    </div>
  );
}

export default App;
