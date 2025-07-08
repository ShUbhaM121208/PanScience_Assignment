const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

const taskController = require('../controllers/taskController');

// Admins can see all tasks
router.get('/all', authMiddleware, authorizeRoles('admin'), taskController.getAllTasks);

// Users can see their own tasks
router.get('/', authMiddleware, taskController.getMyTasks);

// Users can create tasks
router.post('/', authMiddleware, taskController.createTask);

// Users can update their own tasks
router.put('/:id', authMiddleware, taskController.updateTask);

// Admins or owners can delete
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
