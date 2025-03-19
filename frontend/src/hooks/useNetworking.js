import { useState } from "react";

const useNetworking = () => {
  const [pollOption, setPollOption] = useState(""); // Which option the user voted for
  const [pollResults, setPollResults] = useState({ optionA: 0, optionB: 0 });
  const [question, setQuestion] = useState("");
  const [questionsList, setQuestionsList] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [answers, setAnswers] = useState({}); // Stores answers for each question
  const [answerInputs, setAnswerInputs] = useState({}); // Stores input values for each question

  const handleVote = (option) => {
    setPollResults((prev) => ({
      ...prev,
      [option]: prev[option] + 1,
    }));
    setPollOption(option);
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (question.trim() === "") return;
    setQuestionsList([...questionsList, { id: Date.now(), text: question }]);
    setQuestion("");
  };

  const handleAnswerSubmit = (e, questionId) => {
    e.preventDefault();
    if (!answerInputs[questionId]?.trim()) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: [...(prev[questionId] || []), answerInputs[questionId]],
    }));

    setAnswerInputs((prev) => ({
      ...prev,
      [questionId]: "",
    }));
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatMessage.trim() === "") return;
    setChatMessages([...chatMessages, { user: "You", message: chatMessage }]);
    setChatMessage("");
  };

  return {
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
  };
};

export default useNetworking;
