//Packages
import express from "express";
import http from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Server } from "socket.io";
import cors from "cors";

//Instances
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

//Serve html files
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
app.use(express.static(join(__dirname, "../client", "dist")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../client", "dist", "index.html")); // Assuming you have an HTML file in the 'dist' directory
});

//middleware
app.use(cors());

//socket io configuration
io.on("connection", (socket) => {
  console.log(`A user connected with ID: ${socket.id}`);

  // Ask the user for their name
  socket.emit("requestName");

  // Handle user's name
  socket.on("setName", (name) => {
    socket.nickname = name;
    console.log(`User ${socket.id} set nickname to: ${name}`);
    io.emit("chatMessage", {
      nickname: `${name}`,
      text: ` joined the chat.`,
      isChat: false
    });
  });

  // Handle chat messages
  socket.on("chatMessage", (message) => {
    io.emit("chatMessage", {
      nickname: socket.nickname,
      text: message,
      isChat: true
    });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected.`);
    io.emit("chatMessage", {
      nickname: `${socket.nickname}`,
      text: ` left the chat.`,
      isChat: true
    });
  });
});
//Run server
server.listen(3000, () => console.log("listening on port 3000"));
