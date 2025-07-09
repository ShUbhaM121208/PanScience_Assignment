// controllers/taskController.js
const { Task, File } = require("../models");
const mongoose = require("mongoose");

// ✅ For regular users: Get only their own tasks
exports.getTasks = async (req, res) => {
  try {
    const { status, priority, dueDate, page = 1, limit = 10 } = req.query;

    const filters = {
      userId: new mongoose.Types.ObjectId(req.user.id), // Convert string to ObjectId
    };

    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (dueDate) filters.dueDate = dueDate;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [tasks, total] = await Promise.all([
      Task.find(filters)
        .sort({ dueDate: 1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Task.countDocuments(filters),
    ]);

    res.json({ total, tasks });
  } catch (err) {
    console.error("❌ Error fetching user tasks:", err);
    res.status(500).json({ message: "Failed to fetch your tasks" });
  }
};

// ✅ For admins: Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    console.error("❌ Error fetching all tasks:", err);
    res.status(500).json({ message: "Failed to fetch all tasks" });
  }
};

// ✅ Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    console.log("🔍 getTaskById called:", {
      taskId: req.params.id,
      userId: req.user.id,
      userRole: req.user.role
    });

    const task = await Task.findById(req.params.id);

    if (!task) {
      console.log("❌ Task not found:", req.params.id);
      return res.status(404).json({ message: "Task not found" });
    }

    console.log("🔍 Task found:", {
      taskId: task._id,
      taskUserId: task.userId,
      taskUserIdType: typeof task.userId,
      currentUserId: req.user.id,
      currentUserIdType: typeof req.user.id,
      userRole: req.user.role
    });

    // Only admin or owner can view
    const taskUserId = task.userId.toString();
    const currentUserId = req.user.id;
    
    console.log("🔍 User ID Comparison:", {
      taskUserId,
      currentUserId,
      areEqual: taskUserId === currentUserId,
      userIsAdmin: req.user.role === "admin"
    });
    
    if (req.user.role !== "admin" && taskUserId !== currentUserId) {
      console.log("❌ Access denied - User not authorized");
      return res.status(403).json({ 
        message: "Forbidden - You can only view your own tasks",
        debug: {
          taskUserId,
          currentUserId,
          userRole: req.user.role
        }
      });
    }

    console.log("✅ Access granted - Task returned successfully");
    res.json(task);
  } catch (err) {
    console.error("❌ Error fetching task:", err);
    res.status(500).json({ message: "Failed to fetch task" });
  }
};

// ✅ Create a new task (JSON only)
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    // Validate required fields
    if (!title || !description || !priority || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      userId: new mongoose.Types.ObjectId(req.user.id), // Convert string to ObjectId
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("❌ Task creation failed:", err);
    res.status(500).json({ message: "Task creation failed" });
  }
};

// ✅ Create a new task with file uploads
exports.createTaskWithFiles = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    // Validate required fields
    if (!title || !description || !priority || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1. Create the task
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      userId: new mongoose.Types.ObjectId(req.user.id), // Convert string to ObjectId
    });

    // 2. Handle file uploads (if any)
    let files = [];
    if (req.files && req.files.length > 0) {
      files = await Promise.all(
        req.files.map(async (file) => {
          const savedFile = await File.create({
            name: file.originalname,
            url: `/uploads/${file.filename}`,
            taskId: task._id,
            userId: new mongoose.Types.ObjectId(req.user.id), // Convert string to ObjectId
          });
          return savedFile;
        })
      );
    }

    res.status(201).json({ task, files });
  } catch (err) {
    console.error("❌ Task creation with files failed:", err);
    res.status(500).json({ message: "Task creation failed" });
  }
};

// ✅ Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only admin or owner can update
    if (req.user.role !== "admin" && task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden - You can only update your own tasks" });
    }

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    console.error("❌ Task update failed:", err);
    res.status(500).json({ message: "Task update failed" });
  }
};

// ✅ Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only admin or owner can delete
    if (req.user.role !== "admin" && task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden - You can only delete your own tasks" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("❌ Task deletion failed:", err);
    res.status(500).json({ message: "Task deletion failed" });
  }
};