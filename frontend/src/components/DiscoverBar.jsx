import React, { useState } from "react";
import "../styles/DiscoverBar.css";

function DiscoverBar({ subjects }) {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="discover-section">
      <h2 className="discover-title">Discover</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <i className="fas fa-search search-icon"></i> {/* Corrected icon */}
        <input
          type="text"
          placeholder="Search for topics..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Subject Buttons */}
      <div className="subject-buttons">
        {subjects.map((subject, index) => (
          <button key={index} className="subject-btn">
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DiscoverBar;
