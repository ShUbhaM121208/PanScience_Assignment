module.exports = (sequelize, DataTypes) => {
  return sequelize.define("File", {
    filename: { type: DataTypes.STRING, allowNull: false },
    path: { type: DataTypes.STRING, allowNull: false },
  });
};
