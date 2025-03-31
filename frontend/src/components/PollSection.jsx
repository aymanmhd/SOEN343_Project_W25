import React from "react";

const PollSection = ({ handleVote, pollResults }) => {
  const total = pollResults.optionA + pollResults.optionB || 1;

  return (
    <div className="section poll-container">
      <h2 className="title">Live Poll</h2>
      <div className="poll-options">
        <button className="poll-button" onClick={() => handleVote("optionA")}>
          Live Q&A
        </button>
        <button className="poll-button" onClick={() => handleVote("optionB")}>
          Matchmaking
        </button>
      </div>

      <div className="poll-results">
        <p>Live Q&A: {pollResults.optionA} votes</p>
        <p>Matchmaking: {pollResults.optionB} votes</p>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(pollResults.optionA / total) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default PollSection;
