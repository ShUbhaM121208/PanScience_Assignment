// controllers/fileController.js
const { File } = require("../models");

// Upload files
exports.uploadFiles = (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const fileInfo = files.map(file => ({
      name: file.originalname,
      url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
      mimetype: file.mimetype,
      size: file.size,
    }));

    res.status(200).json({ files: fileInfo });
  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error: error.message });
  }
};

// Get files by task ID
exports.getFilesByTask = async (req, res) => {
  try {
    const files = await File.find({ taskId: req.params.taskId });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch files' });
  }
};
