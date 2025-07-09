// models/file.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String },
  url: { type: String, required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }, // Reference to Task
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
