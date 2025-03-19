import React from "react";
import "../styles/HomePage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchableVideoList from "../components/SearchableVideoList";
import DiscoverBar from "../components/DiscoverBar"; // Import DiscoverBar

// ✅ Define sample video data here
const sampleVideos = [
  {
    id: 1,
    title: "Why Programming is important?",
    description: "This is a code.org",
    url: "https://www.youtube.com/watch?v=Dv7gLpW91DM",
    thumbnail: "https://img.youtube.com/vi/Dv7gLpW91DM/hqdefault.jpg",
  },
  {
    id: 2,
    title: "8 Rules For Learning to Code in 2025...and should you?",
    description: "8 rules", // to be changed
    url: "https://www.youtube.com/watch?v=EMWNZtCYg5s&t=1s",
    thumbnail: "https://img.youtube.com/vi/EMWNZtCYg5s/hqdefault.jpg",
  },
];

// ✅ Define subjects for Discover Bar
const subjects = ["Maths", "Coding", "Science", "Engineering", "Art", "History"];

function HomePage() {
  return (
    <div className="homepage">
      <Navbar />

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-image"></div> {/* Left side (image) */}
        <div className="hero-text"> {/* Right side (text) */}
          <h1 className="title">Welcome to the SEES: Smart Education Event System!</h1>
          <p>SEES simplifies educational event management, making learning more interactive and organized for teachers and students. </p>
          <p>Get started today!</p>
        </div>
      </header>

      {/* Discover Bar Section */}
      <DiscoverBar subjects={subjects} />

      {/* Video List */}
      <SearchableVideoList videos={sampleVideos} />

      <Footer />
    </div>
  );
}

export default HomePage;
