/**
 * @swagger
 * tags:
 *   - name: Files
 *     description: File upload and retrieval endpoints
 */
/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Upload a file to S3
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               taskId:
 *                 type: string
 *     responses:
 *       201:
 *         description: File uploaded
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/files/task/{taskId}:
 *   get:
 *     summary: Get files for a task
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of files for the task
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task or files not found
 */
// routes/fileRoutes.js
const express = require('express');
const router = express.Router();

const upload = require('../middlewares/multerConfig');
const authMiddleware = require('../middlewares/authMiddleware');
const fileController = require('../controllers/fileController');

// Upload up to 3 PDF files
router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/task/:taskId', authMiddleware, fileController.getFilesByTask);

module.exports = router;
