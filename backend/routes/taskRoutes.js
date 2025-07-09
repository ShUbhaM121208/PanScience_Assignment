// routes/taskRoutes.js

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Protect all task routes
router.use(authMiddleware);

// Routes
router.get("/", taskController.getTasks); // for logged-in user
router.get("/all", roleMiddleware("admin"), taskController.getAllTasks); // for admin

router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
