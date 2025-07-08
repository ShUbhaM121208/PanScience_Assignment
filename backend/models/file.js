// models/file.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Task = require('./task');

const File = sequelize.define('File', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

File.belongsTo(Task, { foreignKey: 'taskId' });
Task.hasMany(File, { foreignKey: 'taskId' });

module.exports = File;
