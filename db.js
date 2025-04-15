// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// db.connect((err) => {
//   if (err) {
//     console.error("❌ DB connection error:", err);
//     process.exit(1);
//   }
//   console.log("✅ Connected to Railway MySQL DB");
// });

// module.exports = db;






const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // or your MySQL username
  password: '', // add your MySQL password if you have one
  database: 'mangement'
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL (mangement)');
});

module.exports = db;