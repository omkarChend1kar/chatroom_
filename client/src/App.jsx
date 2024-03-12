import { useState, useEffect } from "react";
import io from  "socket.io-client"

const socket = io("http://localhost:3000");

function App() {
  const [messages, setMessage] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessage([...messages, message]);
    });
    return () => {
      socket.off("message");
    };
  }, [messages]);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput)
      setMessageInput('')
    }
  };

  return (
    <>
      <div>
        <h1>Chatroom</h1>
        <input
          type="text"
          value={messageInput}
          placeholder="Type here..."
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>

        <section>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </section>
      </div>
    </>
  );
}

export default App;
