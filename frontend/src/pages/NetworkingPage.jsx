import React from "react";
import "../styles/NetworkingPage.css";
import Footer from "../components/Footer";
import useNetworking from "../hooks/useNetworking";
import PollSection from "../components/PollSection";
import ChatSection from "../components/ChatSection";

const NetworkingPage = () => {
  const { handleVote, handleQuestionSubmit, handleChatSubmit } = useNetworking();

  return (
    <div className="networking-container">
      <div className="networking-header">
        <h1 className="title">Networking & Engagement</h1>
      </div>
      <PollSection handleVote={handleVote} />
      <ChatSection handleChatSubmit={handleChatSubmit} />
      <Footer />
    </div>
  );
};

export default NetworkingPage;
