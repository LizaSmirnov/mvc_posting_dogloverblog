require('dotenv').config();//loads enviro for .env file
console.log(process.env.JAWSDB_URL);
const Sequelize = require('sequelize')
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
          decimalNumbers: true
        },
        port: 3306,
      }
    );
const hi = 'hi';

module.exports = sequelize;