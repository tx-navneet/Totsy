require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require("pg");

const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  dialect: "postgres",
  dialectModule: pg, 
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully with SSL!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

testConnection();

module.exports = sequelize;
