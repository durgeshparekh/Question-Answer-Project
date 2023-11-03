const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: '12345678', // Your MySQL password
  database: 'demodb', // Your database name
});

module.exports = db;
