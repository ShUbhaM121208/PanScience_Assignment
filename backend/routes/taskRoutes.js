// routes/taskRoutes.js

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const multerConfig = require("../middlewares/multerConfig"); // <-- Import multer config

// Protect all task routes
router.use(authMiddleware);

// Routes
router.get("/", taskController.getTasks); // for logged-in user
router.get("/all", roleMiddleware("admin"), taskController.getAllTasks); // for admin

// Use multer for file uploads on task creation
router.post("/", multerConfig.array('documents', 3), taskController.createTaskWithFiles);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
