// frontend/src/patterns/HomeComponentFactory.js
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchableVideoList from "../components/SearchableVideoList";
import DiscoverBar from "../components/DiscoverBar";
import { Link } from "react-router-dom";

const createComponent = (type, props = {}) => {
  switch (type) {
    case "navbar":
      return <Navbar key="navbar" />;
    case "hero":
      return (
        <header className="hero-section" key="hero">
          <div className="hero-image"></div>
          <div className="hero-text">
            <h1 className="title">Welcome to SEES 🎓</h1>
            <p>Your personalized hub for smart educational events.</p>
            <p>Discover workshops, network with peers, and expand your learning journey!</p>
          </div>
        </header>
      );
    case "cta":
      return (
        <section className="cta-section" key="cta">
          <h2>🎉 Ready to unlock the full experience?</h2>
          <p>Join SEES today and start discovering educational events tailored for you.</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-primary">Create an Account</Link>
            <Link to="/login" className="btn">I already have one</Link>
          </div>
        </section>
      );
    case "discover":
      return <DiscoverBar key="discover" subjects={props.subjects} />;
    case "videos":
      return (
        <section className="videos-preview" key="videos">
          <h2 className="section-heading">📹 Featured Content</h2>
          <p className="section-subtext">Get a taste of the knowledge you’ll unlock by signing up.</p>
          <SearchableVideoList videos={props.videos} />
        </section>
      );
    case "footer":
      return <Footer key="footer" />;
    default:
      return null;
  }
};

export default { createComponent };
