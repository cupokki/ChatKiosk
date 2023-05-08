const dotenv = require('dotenv')
const mysql = require('mysql2');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_ID,
  password: process.env.MYSQL_PASSWARD,
  database: 'Ai_Kiosk'
});

connection.connect()//.then(_=>console.log("db connected")).catch(_=>{console.log("err")});

module.exports = connection//, db, collection}
// connection.end();


// connection.query(
//   ``,
//   (error, results, fields) => {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
//   }
// );
