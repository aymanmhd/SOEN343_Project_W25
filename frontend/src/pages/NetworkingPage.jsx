import React from "react";
import "../styles/NetworkingPage.css";
import Footer from "../components/Footer";
import useNetworking from "../hooks/useNetworking"; 

const NetworkingPage = () => {
  const {
    pollOption,
    pollResults,
    handleVote,
    question,
    questionsList,
    handleQuestionSubmit,
    chatMessage,
    chatMessages,
    handleChatSubmit,
    answers,
    answerInputs,
    handleAnswerSubmit,
    setQuestion,
    setChatMessage,
    setAnswerInputs,
  } = useNetworking();

  return (
    <div className="networking-container">
      <div className="networking-header">
        <h1 className="title">Networking & Engagement</h1>
        <p className="subtitle">
          Fostering dynamic interactions through live polling, Q&A, and matchmaking.
        </p>
      </div>

      {/* Live Poll Section */}
      <div className="section">
        <div className="section-image"></div>
        <div className="section-text poll-container">
          <h2 className="title">Live Poll</h2>
          <p>Which feature do you find most engaging?</p>
          <div className="poll-options">
            <button
              className={`poll-button ${pollOption === "optionA" ? "selected" : ""}`}
              disabled={!!pollOption}
              onClick={() => handleVote("optionA")}
            >
              Live Q&A
            </button>
            <button
              className={`poll-button ${pollOption === "optionB" ? "selected" : ""}`}
              disabled={!!pollOption}
              onClick={() => handleVote("optionB")}
            >
              Matchmaking
            </button>
          </div>

          {/* Poll Results with Progress Bar */}
          <p className="poll-results">
            Live Q&A: {pollResults.optionA} votes | Matchmaking: {pollResults.optionB} votes
          </p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${
                  pollResults.optionA + pollResults.optionB === 0
                    ? 50
                    : (pollResults.optionA / (pollResults.optionA + pollResults.optionB)) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Q&A Section */}
      <div className="section">
        <div className="section-image"></div>
        <div className="section-text">
          <h2 className="title">Q&A Sessions</h2>
          <p>Submit your questions and get them answered.</p>

          {/* Question Input Form */}
          <form onSubmit={handleQuestionSubmit} className="question-form">
            <input
              type="text"
              placeholder="Type your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="question-input"
            />
            <button type="submit">Submit</button>
          </form>

          {/* Display Questions & Answers */}
          <div className="questions-list">
            {questionsList.map((q) => (
              <div key={q.id} className="question-item">
                <p>❓ {q.text}</p>

                {/* Answer List */}
                <div className="answers-list">
                  {answers[q.id]?.map((ans, index) => (
                    <p key={index} className="answer-item">💬 {ans}</p>
                  ))}
                </div>

                {/* Answer Input */}
                <form onSubmit={(e) => handleAnswerSubmit(e, q.id)} className="answer-form">
                  <input
                    type="text"
                    placeholder="Write an answer..."
                    value={answerInputs[q.id] || ""}
                    onChange={(e) =>
                      setAnswerInputs((prev) => ({ ...prev, [q.id]: e.target.value }))
                    }
                    className="answer-input"
                  />
                  <button type="submit">Answer</button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chatroom Section */}
      <div className="section">
        <div className="section-image"></div>
        <div className="section-text">
          <h2 className="title">Chatroom</h2>
          <p>Engage in live discussions with other attendees.</p>

          <div className="chat-box">
            {chatMessages.map((chat, index) => (
              <p key={index} className="chat-message">
                <strong>{chat.user}: </strong> {chat.message}
              </p>
            ))}
          </div>

          <form onSubmit={handleChatSubmit} className="chat-form">
            <input
              type="text"
              placeholder="Type a message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="chat-input"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      {/* Matchmaking Section */}
      <div className="section">
        <div className="section-image"></div>
        <div className="section-text">
          <h2 className="title">Matchmaking</h2>
          <p>Find like-minded attendees and create personalized itineraries.</p>
        </div>
      </div>
    </div>
  );
};

export default NetworkingPage;
