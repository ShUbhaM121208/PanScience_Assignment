// controllers/fileController.js
const { Upload } = require("@aws-sdk/lib-storage");
const s3 = require("../utils/s3Client");

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
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
    res.status(500).json({ message: "File upload failed" });
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
