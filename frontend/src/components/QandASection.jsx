import React, { useState } from "react";

const QandASection = () => {
  const [question, setQuestion] = useState("");
  const [questionsList, setQuestionsList] = useState([]);
  const [answers, setAnswers] = useState({});

  const submitQuestion = (e) => {
    e.preventDefault();
    if (question.trim()) {
      const newQuestion = { id: questionsList.length + 1, text: question };
      setQuestionsList([...questionsList, newQuestion]);
      setQuestion("");
    }
  };

  return (
    <div className="section">
      <div className="section-image"></div>
      <div className="section-text">
        <h2 className="title">Q&A Sessions</h2>
        <p>Submit your questions and get them answered.</p>

        {/* Question Input Form */}
        <form onSubmit={submitQuestion} className="question-form">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QandASection;
