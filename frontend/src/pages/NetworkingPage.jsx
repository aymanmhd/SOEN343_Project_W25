import React, { useState } from "react";
import "../styles/NetworkingPage.css";
import Footer from "../components/Footer";
import useNetworking from "../hooks/useNetworking";
import PollSection from "../components/PollSection";
import ChatSection from "../components/ChatSection";
import QandASection from "../components/QandASection";

const NetworkingPage = () => {
  const [activeTab, setActiveTab] = useState(null); // ← default to nothing

  const {
    handleVote,
    handleQuestionSubmit,
    handleChatSubmit,
    pollResults,
    chatMessages,
    questionsList,
  } = useNetworking();

  return (
    <div className="networking-container">
  {/* Welcome Card */}
  <div className="networking-welcome-card">
  <h1 className="welcome-title">👋 Welcome to the Networking Space!</h1>

  <p className="welcome-subtext mt-4">
    We’ve designed this space with three awesome ways to engage:
  </p>

  <div className="welcome-feature-list mt-4">
    <div>
      💬 <span className="highlight">Real-time chatroom</span> to connect with attendees
    </div>
    <div>
      🗳️ <span className="highlight">Interactive polling</span> to share your opinion
    </div>
    <div>
      ❓ <span className="highlight">Question&Answer board</span> to ask and explore event-related topics
    </div>
  </div>

  <p className="welcome-subtext mt-4">
    Pick a feature below and dive in!
  </p>

    {/* Navigation Buttons */}
    <div className="tab-buttons">
      <button
        className={`tab-button ${activeTab === "chat" ? "active" : ""}`}
        onClick={() => setActiveTab((prev) => (prev === "chat" ? null : "chat"))}
      >
        💬 Chatroom
      </button>
      <button
        className={`tab-button ${activeTab === "poll" ? "active" : ""}`}
        onClick={() => setActiveTab((prev) => (prev === "poll" ? null : "poll"))}
      >
        🗳️ Poll
      </button>
      <button
        className={`tab-button ${activeTab === "qna" ? "active" : ""}`}
        onClick={() => setActiveTab((prev) => (prev === "qna" ? null : "qna"))}
      >
        ❓ Q&A
      </button>
    </div>
  </div>

  {/* Engagement Section */}
  {activeTab && (
    <div className="section-wrapper fade-in">
      {activeTab === "chat" && (
        <ChatSection
          handleChatSubmit={handleChatSubmit}
          chatMessages={chatMessages}
        />
      )}
      {activeTab === "poll" && (
        <PollSection handleVote={handleVote} pollResults={pollResults} />
      )}
      {activeTab === "qna" && (
        <QandASection
          handleQuestionSubmit={handleQuestionSubmit}
          questionsList={questionsList}
        />
      )}
    </div>
  )}

  <Footer />
</div>
  );
};

export default NetworkingPage;
