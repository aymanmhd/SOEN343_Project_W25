import React, { useState, useEffect } from "react";
import "../styles/NetworkingPage.css";
import Footer from "../components/Footer";

// Example mock data for the events the user is registered to.
// In a real app, you'd fetch this from your backend, e.g.
// GET /users/:userId/registeredEvents
const mockRegisteredEvents = [
  {
    id: "evt-1",
    title: "Intro to Machine Learning",
    description: "Learn the basics of ML concepts.",
  },
  {
    id: "evt-2",
    title: "Cybersecurity Basics",
    description: "Fundamentals of staying safe online.",
  },
  {
    id: "evt-3",
    title: "Web Dev Bootcamp",
    description: "Dive into modern web development.",
  },
];

const NetworkingPage = () => {
  // Which tab is active? "chat", "poll", or "qna" (or null)
  const [activeTab, setActiveTab] = useState(null);

  // The list of events the user is registered to
  const [registeredEvents, setRegisteredEvents] = useState([]);
  // Which event is currently selected
  const [selectedEvent, setSelectedEvent] = useState(null);

  // ---------------------
  // Chat, Poll, Q&A Data
  // ---------------------
  const [chatMessages, setChatMessages] = useState([]);
  const [pollResults, setPollResults] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);

  // ---------------------
  // On component load, fetch the user’s events
  // ---------------------
  useEffect(() => {
    // fetch("/api/users/123/registeredEvents")
    //   .then(res => res.json())
    //   .then(data => setRegisteredEvents(data))
    //   .catch(err => console.error(err));
    setRegisteredEvents(mockRegisteredEvents);
  }, []);

  // ---------------------
  // When "selectedEvent" changes, fetch Chat/Poll/Q&A
  // ---------------------
  useEffect(() => {
    if (!selectedEvent) return;
    fetchChatData(selectedEvent.id);
    fetchPollData(selectedEvent.id);
    fetchQandAData(selectedEvent.id);
  }, [selectedEvent]);

  // ---------------------
  // Helper: Fetch Chat
  // ---------------------
  const fetchChatData = async (eventId) => {
    try {
      // Example endpoint: GET /events/:eventId/chat
      const res = await fetch(`/events/${eventId}/chat`);
      if (!res.ok) throw new Error("Failed to fetch chat data.");
      const data = await res.json();
      setChatMessages(data);
    } catch (err) {
      console.error("Error fetching chat data:", err);
    }
  };

  // ---------------------
  // Helper: Fetch Polls
  // ---------------------
  const fetchPollData = async (eventId) => {
    try {
      // Example endpoint: GET /events/:eventId/polls
      const res = await fetch(`/events/${eventId}/polls`);
      if (!res.ok) throw new Error("Failed to fetch poll data.");
      const data = await res.json();
      setPollResults(data);
    } catch (err) {
      console.error("Error fetching poll data:", err);
    }
  };

  // ---------------------
  // Helper: Fetch Q&A
  // ---------------------
  const fetchQandAData = async (eventId) => {
    try {
      // Example endpoint: GET /events/:eventId/questions
      const res = await fetch(`/events/${eventId}/questions`);
      if (!res.ok) throw new Error("Failed to fetch Q&A data.");
      const data = await res.json();
      setQuestionsList(data);
    } catch (err) {
      console.error("Error fetching Q&A data:", err);
    }
  };

  // ---------------------
  // Selecting an event
  // ---------------------
  const handleSelectEvent = (eventObj) => {
    setSelectedEvent(eventObj);
    // Reset active tab
    setActiveTab(null);
  };

  // ---------------------
  // Submit a new chat message
  // ---------------------
  const handleChatSubmit = async (message) => {
    if (!selectedEvent || !message.trim()) return;

    try {
      // Example endpoint: POST /events/chat
      const res = await fetch("/events/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: selectedEvent.id,
          message,
          // userId: "currentUserId" (if needed)
        }),
      });
      if (!res.ok) throw new Error("Failed to send chat message.");
      // After posting, re-fetch chat so we see the update
      await fetchChatData(selectedEvent.id);
    } catch (err) {
      console.error("Error sending chat message:", err);
    }
  };

  // ---------------------
  // Vote in a poll
  // ---------------------
  const handleVote = async (pollId, optionIndex) => {
    if (!selectedEvent) return;

    try {
      // Example endpoint: POST /polls/vote
      const res = await fetch("/polls/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollId, optionIndex }),
      });
      if (!res.ok) throw new Error("Error voting in poll.");
      // re-fetch poll data
      await fetchPollData(selectedEvent.id);
    } catch (err) {
      console.error("Error voting in poll:", err);
    }
  };

  // ---------------------
  // Submit a new Q&A question
  // ---------------------
  const handleQuestionSubmit = async (questionText) => {
    if (!selectedEvent || !questionText.trim()) return;

    try {
      // Example endpoint: POST /events/:eventId/questions
      const res = await fetch(`/events/${selectedEvent.id}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionText }),
      });
      if (!res.ok) throw new Error("Error submitting question.");
      // re-fetch Q&A data
      await fetchQandAData(selectedEvent.id);
    } catch (err) {
      console.error("Error submitting Q&A question:", err);
    }
  };

  // ---------------------
  // Inline Chat Section
  // ---------------------
  const ChatSection = () => {
    const [message, setMessage] = useState("");

    const onSendMessage = (e) => {
      e.preventDefault();
      handleChatSubmit(message);
      setMessage("");
    };

    return (
      <div className="dynamic-section-container fade-in chat-section-container">
        <h2 className="dynamic-section-title">💬 Chatroom</h2>

        <div className="chat-messages">
          {chatMessages.length === 0 ? (
            <p className="no-messages">No messages yet. Start the conversation!</p>
          ) : (
            chatMessages.map((msg, idx) => (
              <div key={idx} className="chat-message-item">
                <div className="chat-sender">{msg.senderName}</div>
                <div className="chat-timestamp">{msg.timestamp}</div>
                <div className="chat-content">{msg.message}</div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={onSendMessage} className="chat-form">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="chat-submit-btn">
            Send
          </button>
        </form>
      </div>
    );
  };

  // ---------------------
  // Inline Poll Section
  // ---------------------
  const PollSection = () => {
    return (
      <div className="dynamic-section-container fade-in poll-section-container">
        <h2 className="dynamic-section-title">🗳️ Interactive Poll</h2>

        {pollResults.length === 0 ? (
          <p className="no-polls">No polls available for this event yet.</p>
        ) : (
          pollResults.map((poll) => {
            const totalVotes = poll.votes.reduce((a, b) => a + b, 0);

            return (
              <div key={poll.pollId} className="poll-card">
                <h3 className="poll-question">{poll.question}</h3>
                <div className="poll-options">
                  {poll.options.map((option, index) => (
                    <button
                      key={index}
                      className="poll-option-btn"
                      onClick={() => handleVote(poll.pollId, index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="poll-results">
                  {poll.options.map((option, index) => {
                    const count = poll.votes[index];
                    const percent =
                      totalVotes > 0
                        ? Math.round((count / totalVotes) * 100)
                        : 0;

                    return (
                      <div key={index} className="poll-result-item">
                        <div className="poll-option-label">
                          {option}: {count} vote{count !== 1 ? "s" : ""} (
                          {percent}%)
                        </div>
                        <div className="poll-result-bar">
                          <div
                            className="poll-result-fill"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };

  // ---------------------
  // Inline Q&A Section
  // ---------------------
  const QandASection = () => {
    const [questionText, setQuestionText] = useState("");

    const onSubmitQuestion = (e) => {
      e.preventDefault();
      handleQuestionSubmit(questionText);
      setQuestionText("");
    };

    return (
      <div className="dynamic-section-container fade-in qna-section-container">
        <h2 className="dynamic-section-title">❓ Q&amp;A</h2>
        <p className="qna-subtext">
          Ask your questions or explore what others have asked!
        </p>

        <form onSubmit={onSubmitQuestion} className="qna-form">
          <input
            className="qna-input"
            type="text"
            placeholder="Type your question here..."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <button type="submit" className="qna-submit-btn">
            Submit
          </button>
        </form>

        <div className="qna-questions">
          {questionsList.length === 0 ? (
            <p className="no-questions">No questions yet. Be the first to ask!</p>
          ) : (
            questionsList.map((q) => (
              <div key={q.questionId} className="qna-question-card">
                <p className="qna-question-text">{q.questionText}</p>
                {q.answered && q.answerText ? (
                  <div className="qna-answer">
                    <strong>Answer:</strong> {q.answerText}
                  </div>
                ) : (
                  <p className="qna-awaiting">Awaiting answer</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="networking-container">
      {/* Horizontal scroller of events */}
      <div className="registered-events-scroll-container">
        <div className="registered-events-scroller">
          {registeredEvents.length === 0 ? (
            <p>No registered events found.</p>
          ) : (
            registeredEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => handleSelectEvent(evt)}
                className={`event-card ${
                  selectedEvent?.id === evt.id ? "selected" : ""
                }`}
              >
                <h3>{evt.title}</h3>
                <p>{evt.description}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Welcome card + feature tabs */}
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
            ❓ <span className="highlight">Question &amp; Answer board</span> to ask and explore
            event-related topics
          </div>
        </div>

        <p className="welcome-subtext mt-4">
          Select an event above, then pick a feature below and dive in!
        </p>

        {selectedEvent ? (
          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === "chat" ? "active" : ""}`}
              onClick={() =>
                setActiveTab((prev) => (prev === "chat" ? null : "chat"))
              }
            >
              💬 Chatroom
            </button>
            <button
              className={`tab-button ${activeTab === "poll" ? "active" : ""}`}
              onClick={() =>
                setActiveTab((prev) => (prev === "poll" ? null : "poll"))
              }
            >
              🗳️ Poll
            </button>
            <button
              className={`tab-button ${activeTab === "qna" ? "active" : ""}`}
              onClick={() =>
                setActiveTab((prev) => (prev === "qna" ? null : "qna"))
              }
            >
              ❓ Q&amp;A
            </button>
          </div>
        ) : (
          <p style={{ marginTop: "20px", color: "#666" }}>
            Please select an event to unlock Chat/Poll/Q&A features.
          </p>
        )}
      </div>

      {activeTab && selectedEvent && (
        <div className="section-wrapper fade-in">
          {activeTab === "chat" && <ChatSection />}
          {activeTab === "poll" && <PollSection />}
          {activeTab === "qna" && <QandASection />}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default NetworkingPage;
