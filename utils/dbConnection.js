const dotenv = require('dotenv')
const mysql = require('mysql2/promise');

dotenv.config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWARD,
  database: 'Ai_Kiosk'
});

// connection.connect()

module.exports = connection//, db, collection}
// connection.end();


// connection.query(
//   ``,
//   (error, results, fields) => {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
//   }
// );
