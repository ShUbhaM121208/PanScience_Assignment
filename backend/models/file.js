// models/file.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  url: String, // S3 URL
  mimetype: String,
  size: Number,
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);
