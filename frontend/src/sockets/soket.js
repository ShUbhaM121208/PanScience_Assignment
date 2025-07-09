// src/sockets/socket.js
import { io } from "socket.io-client";

// ✅ Point to the correct backend port (5003 in your case)
const SOCKET_URL = "http://localhost:5003";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,          // ✅ Add if using cookies/auth
  reconnectionAttempts: 5,        // optional: retry logic
  reconnectionDelay: 1000,        // optional: retry delay
});
