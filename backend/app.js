const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Route imports
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const fileRoutes = require('./routes/fileRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// ===== Middleware =====

// CORS configuration for frontend access
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(morgan('dev'));

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PanScience Assignment API',
      version: '1.0.0',
      description: 'API documentation for PanScience Assignment',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Path to the API docs
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ===== API Routes =====
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ===== Optional: 404 Handler =====
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// ===== Optional: Global Error Handler =====
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
