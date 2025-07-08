// models/task.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  priority: {
    type: DataTypes.STRING,
    defaultValue: 'normal',
  },
  dueDate: DataTypes.DATE,
});

Task.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Task, { foreignKey: 'userId' });

module.exports = Task;
