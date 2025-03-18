import React from "react";
import "../styles/Video.css"; // Import styles
import Video from "./Video";

function VideoList({ videos, emptyHeading }) {
  const count = videos.length;
  let heading = emptyHeading;

  if (count > 0) {
    const noun = count > 1 ? "Videos" : "Video";
    heading =  " " + noun;
  }

  return (
    <section className="video-section">
      <h2>{heading}</h2>
      <div className="video-grid">
        {videos.map((video) => (
          <Video key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}

export default VideoList;
