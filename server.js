const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const cors = require("cors");
const PORT = 3000;
const gameLogic = require("./game.js");
const rooms = {};

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const generateRoomCode = () => {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
};

io.on("connection", (socket) => {
  socket.on("createRoom", ({ category }) => {
    if (!category) {
      socket.emit("roomCreationError", "no cat");
      return;
    }

    let roomCode;
    do {
      roomCode = generateRoomCode();
    } while (rooms[roomCode]);

    const newRoom = {
      roomCode: roomCode,
      roomName: `Room ${roomCode}`,
      players: [socket.id],
      category: category,
      drawer: socket.id
    };

    rooms[roomCode] = newRoom;
    socket.join(roomCode);
    socket.emit("roomCreated", { roomCode, roomName: newRoom.roomName });
  });

  socket.on("joinRoom", ({ roomCode }) => {
    const room = rooms[roomCode];

    if (room) {
      socket.join(roomCode);
      room.players.push(socket.id);
      socket.emit("joinedRoom", { roomCode, roomName: room.roomName });

      socket.emit("roomDetails", {
        players: room.players,
        prompt: gameLogic.getPromptByCategory(room.category), 
      });

      console.log(` ${roomCode} + one/one/one/one/one/tim trash`);
    } else {
      socket.emit("noRoom", `no ${roomCode}.`);
    }
  });

  socket.on("getPrompt", ({ roomCode, category }) => {
    if (!category) {
      socket.emit("noPrompts", "no cat");
      return;
    }

    const room = rooms[roomCode];
    if (room && room.category === category) {
      const prompt = gameLogic.getPromptByCategory(category);
      if (prompt) {
        io.to(roomCode).emit("newPrompt", prompt);
      } else {
        socket.emit("noPrompts", `no ${category}`);
      }
    } else {
      socket.emit("noRoom", `no ${roomCode} `);
    }
  });

  socket.on("disconnect", () => {
    for (const roomCode in rooms) {
      const room = rooms[roomCode];
      if (room && room.players.includes(socket.id)) {
        room.players = room.players.filter((id) => id !== socket.id);
        if (room.players.length === 0) {
          delete rooms[roomCode];
        }
        break;
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`port ${PORT}`);
});
