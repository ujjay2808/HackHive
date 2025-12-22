const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const ACTIONS = require("./Actions");
const cors = require("cors");
const axios = require("axios");
const server = http.createServer(app);
require("dotenv").config();

// Piston API language mapping
const languageMapping = {
  python3: "python",
  javascript: "javascript",
  typescript: "typescript",
  java: "java",
  cpp: "c++",
  c: "c",
  csharp: "csharp",
  ruby: "ruby",
  go: "go",
  rust: "rust",
  php: "php",
  swift: "swift",
  sql: "sqlite3",
};

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {};
const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};

io.on("connection", (socket) => {
  console.log('Socket connected', socket.id);
  
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    
    // Notify that new user joined
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  // Sync the code
  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // Sync language changes
  socket.on(ACTIONS.LANGUAGE_CHANGE, ({ roomId, language }) => {
    socket.in(roomId).emit(ACTIONS.LANGUAGE_CHANGE, { language });
  });

  // When new user joins, sync code
  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // Leave room
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    
    // Leave all the rooms
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });

    delete userSocketMap[socket.id];
    socket.leave();
  });
});

// Compile endpoint using Piston API (FREE!)
app.post("/compile", async (req, res) => {
  const { code, language } = req.body;

  try {
    const pistonLanguage = languageMapping[language] || language;
    
    const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language: pistonLanguage,
      version: "*", // Use latest version
      files: [
        {
          content: code,
        },
      ],
    });

    // Format the response
    const output = response.data.run.output || response.data.run.stderr || "No output";
    
    res.json({
      output: output,
      language: pistonLanguage,
    });
  } catch (error) {
    console.error("Compilation error:", error.response?.data || error.message);
    res.status(500).json({ 
      error: "Failed to compile code",
      details: error.response?.data?.message || error.message 
    });
  }
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));