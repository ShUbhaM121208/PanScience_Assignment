// routes/taskRoutes.js
const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Protect all routes
router.use(authMiddleware);

// Regular user routes
router.get('/', taskController.getMyTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

// Admin-only route
router.get('/all', roleMiddleware('admin'), taskController.getAllTasks);

module.exports = router;
