// routes/fileRoutes.js
const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multerConfig');
const authMiddleware = require('../middlewares/authMiddleware');
const fileController = require('../controllers/fileController');

// Upload up to 3 PDF files
router.post('/upload', authMiddleware, upload.array('files', 3), fileController.uploadFiles);
router.get('/task/:taskId', authMiddleware, fileController.getFilesByTask);

module.exports = router;
