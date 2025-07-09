// models/task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'pending' },
  priority: { type: String, default: 'normal' },
  dueDate: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
