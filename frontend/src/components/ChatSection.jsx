import React, { useState } from "react";

const ChatSection = ({ handleChatSubmit, chatMessages }) => {
  const [input, setInput] = useState("");

  const send = () => {
    handleChatSubmit(input);
    setInput("");
  };

  return (
    <div className="section">
      <h2 className="title">Chatroom</h2>

      <div className="chat-box">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.user === "You" ? "you" : ""}`}>
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
};

export default ChatSection;
