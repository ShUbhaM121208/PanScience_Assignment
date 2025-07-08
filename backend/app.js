// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const authRoutes = require("./routes/authRoutes");
// const taskRoutes = require("./routes/taskRoutes");
// const fileRoutes = require("./routes/fileRoutes");
// const path = require("path");

// const app = express();

// app.use(cors());
// app.use(morgan("dev"));
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/files", fileRoutes);

// module.exports = app;