// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5003/api", // ✅ Change this to match your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add token automatically if stored in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
