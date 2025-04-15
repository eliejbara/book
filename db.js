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
