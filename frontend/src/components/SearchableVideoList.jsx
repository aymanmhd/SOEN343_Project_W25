import React, { useState } from "react";
import SearchInput from "../components/SearchInput";
import VideoList from "../components/VideoList";
import "../styles/SearchableVideoList.css";

function SearchableVideoList({ videos }) {
  const [searchText, setSearchText] = useState("");

  // Function to filter videos based on search input
  const foundVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="searchable-video-container">
      <h2 className="section-title">Newest</h2>
      <p className="section-subtitle">Our top choices</p>

      <SearchInput value={searchText} onChange={(newText) => setSearchText(newText)} />

      <VideoList videos={foundVideos} emptyHeading={`No matches for "${searchText}"`} />
    </div>
  );
}

export default SearchableVideoList;
