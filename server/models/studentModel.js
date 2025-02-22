const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  activity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  objective: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  material: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  example: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["date", "category"], 
    },
  ],
});

module.exports = Student;
