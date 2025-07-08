// app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes'); // ✅ Import task routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Static file serving (for uploaded PDFs)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); // ✅ Mount task routes

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
