require('dotenv').config();//loads enviro for .env file
console.log(process.env.JAWSDB_URL);
const Sequelize = require('sequelize')
const sequelize = process.env.JAWSDB_URL //not populating from .env file not doing line 5 going to line 6
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

    console.log(sequelize)

module.exports = sequelize;