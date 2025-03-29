import React, { useState } from "react";

const QandASection = ({ handleQuestionSubmit, questionsList }) => {
  const [input, setInput] = useState("");

  const submit = (e) => {
    e.preventDefault();
    handleQuestionSubmit(input);
    setInput("");
  };

  return (
    <div className="section">
      <div className="section-text">
        <h2 className="title">Q&A Sessions</h2>
        <p>Submit your questions and get them answered.</p>

        <form onSubmit={submit} className="qna-input">
          <input
            type="text"
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>

        <div className="qna-container">
          {questionsList.map((q) => (
            <div key={q.id} className="qna-question">
              ❓ {q.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QandASection;
