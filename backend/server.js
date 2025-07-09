// server.js

const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const sequelize = require("./config/db");
const { User, Task, File } = require("./models");
const app = require("./app");

dotenv.config();

const PORT = process.env.PORT || 5000;

// 🔌 Create HTTP server from Express app
const server = http.createServer(app);

// 🔁 Attach Socket.IO to the server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // ✅ Your frontend port
    methods: ["GET", "POST"],
  },
});

// ✅ Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("🟢 WebSocket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 WebSocket disconnected:", socket.id);
  });

  // Optional: task event broadcasts
  // socket.on("task:create", (data) => {
  //   socket.broadcast.emit("task:created", data);
  // });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync({ alter: true });
    console.log("✅ Tables synced");

    // 🚀 Start the server with WebSocket support
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
  }
})();
