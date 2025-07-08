// server.js
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const { User, Task, File } = require('./models');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync({ alter: true }); // use { force: true } to drop tables and recreate
    console.log('✅ Tables synced');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to DB:', err);
  }
})();
