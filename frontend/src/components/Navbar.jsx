import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import authentication context
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth(); // Get authentication state

  // Determine the correct homepage link
  const homeLink = user
    ? user.role === "attendee"
      ? "/attendee-dashboard"
      : user.role === "organizer"
        ? "/organizer-dashboard"
        : "/admin-dashboard"
    : "/";

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to={homeLink}>SEES</Link> {/* Home redirects based on user role */}
      </div>

      <div className="nav-links">
        <Link to={homeLink}>Home</Link> {/* Home updates dynamically */}



        {/* Show different navbar items based on user role */}
        {user && user.role === "attendee" && (
          <>
            <Link to="/events">Explore</Link>
            <Link to="/my-events">My Events</Link>
            <Link to="/networking">Networking</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/feedback">Feedback</Link>
          </>
        )}

        {/* Show About & Contact only for public users & attendees */}
        {(!user || user.role === "attendee") && (
          <>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
          </>
        )}


        {user && user.role === "organizer" && (
          <>
            <Link to="/create-event">Create Event</Link>
            <Link to="/manage-events">Manage Events</Link>
            <Link to="/promotions">Promotions</Link>
            <Link to="/analytics">Analytics</Link>
          </>
        )}

        {user && user.role === "admin" && (
          <>
            <Link to="/user-management">Users</Link>
            <Link to="/moderation">Moderation</Link>
            <Link to="/admin-reports">Reports</Link>
            <Link to="/admin-financials">Financials</Link>
          </>
        )}
      </div>

      {/* Authentication Buttons */}
      <div className="auth-buttons">
        {!user ? (
          <>
            <Link to="/login" className="btn">Sign In</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="btn">My Profile</Link> {/* Profile Button */}
            <button className="btn logout-btn" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
