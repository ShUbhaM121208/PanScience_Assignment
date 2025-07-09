const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const fileRoutes = require('./routes/fileRoutes'); // ✅ Import file routes

const app = express();

// ✅ CORS configuration for frontend access
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// ✅ Serve static files (e.g., PDFs) from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/files', fileRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
