module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Task", {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM("pending", "in progress", "completed"), defaultValue: "pending" },
    priority: { type: DataTypes.ENUM("low", "medium", "high"), defaultValue: "medium" },
    due_date: { type: DataTypes.DATEONLY },
  });
};