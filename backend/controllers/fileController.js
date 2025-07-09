// controllers/fileController.js
const { Upload } = require("@aws-sdk/lib-storage");
const s3 = require("../utils/s3Client");
const { File } = require("../models");
const mongoose = require("mongoose");

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Check if AWS credentials are configured
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_BUCKET_NAME) {
      console.error("❌ AWS credentials not configured");
      return res.status(500).json({ 
        message: "File upload service not configured. Please check AWS credentials." 
      });
    }

    const upload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });

    const result = await upload.done();

    // Save file metadata to MongoDB if needed

    res.status(200).json({ message: "File uploaded", location: result.Location });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    res.status(500).json({ 
      message: "File upload failed", 
      error: err.message 
    });
  }
};

// Get files by task ID
exports.getFilesByTask = async (req, res) => {
  try {
    const files = await File.find({ taskId: new mongoose.Types.ObjectId(req.params.taskId) });
    res.json(files);
  } catch (err) {
    console.error("❌ Error fetching files by task:", err);
    res.status(500).json({ message: 'Failed to fetch files', error: err.message });
  }
};
