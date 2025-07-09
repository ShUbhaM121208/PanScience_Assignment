// controllers/taskController.js
const { Task } = require("../models");
const { Op } = require("sequelize");

// ✅ For regular users: Get only their own tasks
exports.getTasks = async (req, res) => {
  try {
    const { status, priority, dueDate, page = 1, limit = 10 } = req.query;

    const filters = {
      assigned_to: req.user.id,
    };

    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (dueDate) filters.due_date = dueDate;

    const tasks = await Task.findAndCountAll({
      where: filters,
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [["due_date", "ASC"]],
    });

    res.json({ total: tasks.count, tasks: tasks.rows });
  } catch (err) {
    console.error("❌ Error fetching user tasks:", err);
    res.status(500).json({ message: "Failed to fetch your tasks" });
  }
};

// ✅ For admins: Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [["due_date", "ASC"]],
    });
    res.json(tasks);
  } catch (err) {
    console.error("❌ Error fetching all tasks:", err);
    res.status(500).json({ message: "Failed to fetch all tasks" });
  }
};

// ✅ Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, due_date } = req.body;

    // Validate required fields
    if (!title || !description || !priority || !due_date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      due_date,
      assigned_to: req.user.id, // ✅ Make sure `req.user` is being set by auth middleware
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("❌ Task creation failed:", err);
    res.status(500).json({ message: "Task creation failed" });
  }
};

// ✅ Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role !== "admin" && task.assigned_to !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await task.update(req.body);
    res.json(task);
  } catch (err) {
    console.error("❌ Task update failed:", err);
    res.status(500).json({ message: "Task update failed" });
  }
};

// ✅ Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role !== "admin" && task.assigned_to !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("❌ Task deletion failed:", err);
    res.status(500).json({ message: "Task deletion failed" });
  }
};
