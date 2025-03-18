import React, { useState } from "react";
import "../styles/Video.css";

function Video({ video }) {
  const [liked, setLiked] = useState(false);

  // Shorten description to 50 characters max
  const shortDescription =
    video.description.length > 50
      ? video.description.substring(0, 50) + "..."
      : video.description;

  return (
    <div className="video-card">
      {/* Thumbnail */}
      <a href={video.url} target="_blank" rel="noopener noreferrer">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="video-thumbnail"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150"; // Fallback image
          }}
        />
      </a>

      {/* Video info */}
      <div className="video-info">
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="video-title">
          {video.title}
        </a>
        <p className="video-description">{shortDescription}</p>
      </div>

      {/* Like Button */}
      <button className="like-button" onClick={() => setLiked(!liked)}>
        {liked ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

export default Video;
