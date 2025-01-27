const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const cors = require("cors");
const PORT = 3000;
const rooms = {};

app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST"], 
    credentials: true, 
  })
);
app.use(express.static(path.join(__dirname, "clerk-vue", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "clerk-vue", "dist", "index.html"));
});

const generateRoomCode = () => {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
};

io.on("connection", (socket) => {
  socket.on("createRoom", ({ roomName, password }) => {
    const roomCode = generateRoomCode();

    if (rooms[roomCode]) {
      socket.emit("roomExists", `Room ${roomCode} already exists.`);
    } else {
      rooms[roomCode] = { roomName, password, players: [] };
      socket.join(roomCode);
      rooms[roomCode].players.push(socket.id);
      socket.emit("roomCreated", { roomCode, roomName });
    }
  });

  socket.on("joinRoom", ({ roomCode, password }) => {
    if (rooms[roomCode]) {
      if (rooms[roomCode].password === password) {
        socket.join(roomCode);
        rooms[roomCode].players.push(socket.id);
        socket.emit("joinedRoom", { roomCode, roomName: rooms[roomCode].roomName });
      } else {
        socket.emit("incorrectPassword", "Incorrect room password.");
      }
    } else {
      socket.emit("noRoom", `Room ${roomCode} does not exist.`);
    }
  });

  socket.on("disconnect", () => {
    for (const roomCode in rooms) {
      const room = rooms[roomCode];
      if (room.players.includes(socket.id)) {
        room.players = room.players.filter((id) => id !== socket.id);
        if (room.players.length === 0) {
          delete rooms[roomCode];
        }
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
