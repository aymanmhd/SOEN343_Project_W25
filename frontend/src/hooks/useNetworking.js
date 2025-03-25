import { useState, useEffect } from "react";
import EventEmitter from "../patterns/EventEmitter";

const useNetworking = () => {
  const [pollOption, setPollOption] = useState("");
  const [pollResults, setPollResults] = useState({ optionA: 0, optionB: 0 });
  const [questionsList, setQuestionsList] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    EventEmitter.emit("updatePoll", { pollOption, pollResults });
  }, [pollOption, pollResults]);

  useEffect(() => {
    EventEmitter.emit("updateQuestions", questionsList);
  }, [questionsList]);

  useEffect(() => {
    EventEmitter.emit("updateChat", chatMessages);
  }, [chatMessages]);

  const handleVote = (option) => {
    setPollResults(prev => ({ ...prev, [option]: prev[option] + 1 }));
    setPollOption(option);
  };

  const handleQuestionSubmit = (questionText) => {
    if (!questionText.trim()) return;
    setQuestionsList(prev => [...prev, { id: Date.now(), text: questionText }]);
  };

  const handleChatSubmit = (message) => {
    if (!message.trim()) return;
    setChatMessages(prev => [...prev, { user: "You", message }]);
  };

  return { handleVote, handleQuestionSubmit, handleChatSubmit };
};

export default useNetworking;
