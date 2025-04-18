const mysql = require('mysql2');


// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost', // Replace with your MySQL server host
    user: 'root',      // Replace with your MySQL username
    password: '123456',      // Replace with your MySQL password
    database: 'react-blog'   // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = db.promise(); 