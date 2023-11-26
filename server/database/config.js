const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

let connection;

const dbConnection = () => {
  try {
    if (!connection) {
      connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      });
    }
    return connection;
  } catch (error) {
    throw error;
  }
};

module.exports = { dbConnection };
