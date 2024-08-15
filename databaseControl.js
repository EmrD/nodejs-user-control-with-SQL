const mysql2 = require("mysql2");

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  database: "users"
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database.");

  const createTableQuery = `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )`;

  db.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating table:", err);
      return;
    }
    console.log("Users table is created or already exists!");
  });
});

module.exports = db;
