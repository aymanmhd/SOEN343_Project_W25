import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchableVideoList from "../components/SearchableVideoList";
import DiscoverBar from "../components/DiscoverBar";

class HomeComponentFactory {
  static createComponent(type, props) {
    switch (type) {
      case "navbar":
        return <Navbar key="navbar" />;
      case "hero":
        return (
          <header className="hero-section" key="hero">
            <div className="hero-image"></div> 
            <div className="hero-text"> 
              <h1 className="title">Welcome to the SEES: Smart Education Event System!</h1>
              <p>SEES simplifies educational event management, making learning more interactive and organized for teachers and students.</p>
              <p>Get started today!</p>
            </div>
          </header>
        );
      case "discover":
        return <DiscoverBar key="discover" subjects={props.subjects} />;
      case "videos":
        return <SearchableVideoList key="videos" videos={props.videos} />;
      case "footer":
        return <Footer key="footer" />;
      default:
        return null;
    }
  }
}

export default HomeComponentFactory;
