import React, { useState, useEffect } from "react";
import EventEmitter from "../patterns/EventEmitter";

const PollSection = ({ handleVote }) => {
  const [pollOption, setPollOption] = useState("");
  const [pollResults, setPollResults] = useState({ optionA: 0, optionB: 0 });

  useEffect(() => {
    EventEmitter.subscribe("updatePoll", ({ pollOption, pollResults }) => {
      setPollOption(pollOption);
      setPollResults(pollResults);
    });

    return () => EventEmitter.unsubscribe("updatePoll");
  }, []);

  return (
    <div className="section">
      <h2 className="title">Live Poll</h2>
      <button disabled={!!pollOption} onClick={() => handleVote("optionA")}>Live Q&A</button>
      <button disabled={!!pollOption} onClick={() => handleVote("optionB")}>Matchmaking</button>
      <p>Live Q&A: {pollResults.optionA} votes | Matchmaking: {pollResults.optionB} votes</p>
    </div>
  );
};

export default PollSection;
