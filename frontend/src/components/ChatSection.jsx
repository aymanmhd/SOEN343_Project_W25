import React, { useState, useEffect } from "react";
import EventEmitter from "../patterns/NetworkingPageObserver";

const ChatSection = ({ handleChatSubmit }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    EventEmitter.subscribe("updateChat", (messages) => setChatMessages(messages));

    return () => EventEmitter.unsubscribe("updateChat");
  }, []);

  return (
    <div className="section">
      <h2 className="title">Chatroom</h2>
      {chatMessages.map((msg, index) => (
        <p key={index}><strong>{msg.user}:</strong> {msg.message}</p>
      ))}
      <button onClick={() => handleChatSubmit("Hello!")}>Send Message</button>
    </div>
  );
};

export default ChatSection;
