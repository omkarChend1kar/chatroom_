import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const generateRandomName = () => {
  const adjectives = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"];
  const nouns = ["Lion", "Tiger", "Bear", "Elephant", "Wolf", "Fox"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective}${noun}`;
};

const ChatApp = () => {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (nickname.trim() !== "") {
      socket.emit("setName", nickname);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      socket.emit("chatMessage", message);
      setMessage("");
    }
  };

  useEffect(() => {
    // Generate a random name
    const randomName = generateRandomName();
    setNickname(randomName);

    socket.emit("setName", randomName);

    socket.on("chatMessage", (message) => {
      setChat((prevChat) => [...prevChat, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="chat-container">
      {nickname ? (
        <div className="chat">
          <div className="chat-messages">
            <ul>
              {chat.map((msg, index) => (
                <li
                  key={index}
                  className={msg.nickname === nickname ? "right" : "left"}
                >
                  {msg.isChat ? (
                    <strong>
                      {msg.nickname === nickname ? "Me" : msg.nickname} :{" "}
                      {msg.text}
                    </strong>
                  ) : (
                    <strong>
                      {msg.nickname === nickname ? "You" : msg.nickname} {" "}
                      {msg.text}
                    </strong>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="chat-input">
            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="name-input">
          <form onSubmit={handleNameSubmit}>
            <label>Enter your name:</label>
            <input
              type="text"
              placeholder="Your Name"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <button type="submit">Join Chat</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
