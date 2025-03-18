import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">SEES</Link> {/* Replace with your actual logo */}
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="auth-buttons">
        <Link to="/login" className="btn">Sign In</Link>
        <Link to="/signup" className="btn btn-primary">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
