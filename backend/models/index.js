const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const User = require("./user")(sequelize, Sequelize.DataTypes);
const Task = require("./task")(sequelize, Sequelize.DataTypes);
const File = require("./file")(sequelize, Sequelize.DataTypes);

User.hasMany(Task, { foreignKey: "assigned_to" });
Task.belongsTo(User, { foreignKey: "assigned_to" });
Task.hasMany(File, { foreignKey: "task_id" });
File.belongsTo(Task, { foreignKey: "task_id" });

module.exports = { sequelize, User, Task, File };

// models/user.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("admin", "user"), defaultValue: "user" },
  });
};