// controllers/taskController.js
const { Task, File } = require("../models");

// ✅ For regular users: Get only their own tasks
exports.getTasks = async (req, res) => {
  try {
    const { status, priority, dueDate, page = 1, limit = 10 } = req.query;

    const filters = {
      userId: req.user.id, // Mongoose: userId is ObjectId
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
      userId: req.user.id, // Mongoose: userId is ObjectId
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
      userId: req.user.id,
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
            userId: req.user.id,
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
      return res.status(403).json({ message: "Forbidden" });
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
      return res.status(403).json({ message: "Forbidden" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("❌ Task deletion failed:", err);
    res.status(500).json({ message: "Task deletion failed" });
  }
};