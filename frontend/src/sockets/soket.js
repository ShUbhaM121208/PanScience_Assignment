// src/sockets/socket.js
import { io } from "socket.io-client";

// Update this to your actual backend host
const SOCKET_URL = "http://localhost:5000"; // or your deployed backend URL

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"],
});
