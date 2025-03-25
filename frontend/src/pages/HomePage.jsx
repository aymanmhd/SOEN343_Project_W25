import React from "react";
import "../styles/HomePage.css";
import HomeComponentFactory from "../patterns/HomeComponentFactory";

// Sample Data
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
    description: "8 rules",
    url: "https://www.youtube.com/watch?v=EMWNZtCYg5s&t=1s",
    thumbnail: "https://img.youtube.com/vi/EMWNZtCYg5s/hqdefault.jpg",
  },
];

const subjects = ["Maths", "Coding", "Science", "Engineering", "Art", "History"];

function HomePage() {
  return (
    <div className="homepage">
      {HomeComponentFactory.createComponent("navbar")}
      {HomeComponentFactory.createComponent("hero")}
      {HomeComponentFactory.createComponent("discover", { subjects })}
      {HomeComponentFactory.createComponent("videos", { videos: sampleVideos })}
      {HomeComponentFactory.createComponent("footer")}
    </div>
  );
}

export default HomePage;
